const CAPTURE_TEMPLATE_KEYS = {
  PULL_REQUEST: "R",
  JIRA_TASK: "J",
};

export const detectCaptureTemplate = parameters => {
  const tfsPRPattern = /tfs.*pullrequest/;
  if (tfsPRPattern.test(parameters.url)) {
    return { ...parameters, template: CAPTURE_TEMPLATE_KEYS.PULL_REQUEST };
  }
  const jiraIssuePattern = /jira.*browse/;
  if (jiraIssuePattern.test(parameters.url)) {
    return { ...parameters, template: CAPTURE_TEMPLATE_KEYS.JIRA_TASK };
  }
  const jiraBoardPattern = /jira.*selectedIssue/;
  if (jiraBoardPattern.test(parameters.url)) {
    const boardUrl = new URL(parameters.url);
    const taskId = boardUrl.searchParams.get("selectedIssue");
    const url = new URL(`/browse/${taskId}`, parameters.url).toString();
    return {
      ...parameters,
      template: CAPTURE_TEMPLATE_KEYS.JIRA_TASK,
      title: `JIRA ${taskId}`,
      url,
    };
  }
  return parameters;
};
