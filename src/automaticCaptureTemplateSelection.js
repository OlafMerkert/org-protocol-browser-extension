import { assoc, flip, test } from "ramda";

const CAPTURE_TEMPLATE_KEYS = {
  PULL_REQUEST: "R",
  JIRA_TASK: "J",
};

const jiraBoardParameters = parameters => {
  const boardUrl = new URL(parameters.url);
  const taskId = boardUrl.searchParams.get("selectedIssue");
  const url = new URL(`/browse/${taskId}`, parameters.url).toString();
  return {
    ...parameters,
    template: CAPTURE_TEMPLATE_KEYS.JIRA_TASK,
    title: `JIRA ${taskId}`,
    url,
  };
};

export const detectCaptureTemplate = parameters => {
  const testUrl = flip(test)(parameters.url);
  const withTemplate = flip(assoc("template"))(parameters);

  const tfsPRPattern = /tfs.*pullrequest/;
  if (testUrl(tfsPRPattern)) {
    return withTemplate(CAPTURE_TEMPLATE_KEYS.PULL_REQUEST);
  }
  const jiraIssuePattern = /jira.*browse/;
  if (testUrl(jiraIssuePattern)) {
    return withTemplate(CAPTURE_TEMPLATE_KEYS.JIRA_TASK);
  }
  const jiraBoardPattern = /jira.*selectedIssue/;
  if (testUrl(jiraBoardPattern)) {
    return jiraBoardParameters(parameters);
  }
  return parameters;
};
