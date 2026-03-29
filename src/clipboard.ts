import { getJiraTask } from "./contentCapture";
import { NO_ISSUE_SELECTED_MESSAGE } from "./messages";

const writeClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

function formatIssueNumber({ issue, parent }) {
  if (parent) {
    return `${parent.id} ${issue.id}`;
  } else {
    return issue.id;
  }
}

export const handleCopyIssueNumbersToClipboard = async () => {
  const issueData = await getJiraTask();
  if (issueData) {
    writeClipboard(formatIssueNumber(issueData));
  } else {
    alert(NO_ISSUE_SELECTED_MESSAGE);
  }
  window.close();
};

function sanitiseBranchTitle(title) {
  return title
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll(":", "")
    .replaceAll("/", "-")
    .replaceAll("_", "-");
}

function formatIssueToBranchName({ issue, parent }) {
  const branchTitle = sanitiseBranchTitle(issue.title);
  if (parent) {
    return `${parent.id}-${issue.id}-${branchTitle}`;
  } else {
    return `${issue.id}-${branchTitle}`;
  }
}

export const handleCopyBranchNameToClipboard = async () => {
  const issueData = await getJiraTask();
  if (issueData) {
    writeClipboard(formatIssueToBranchName(issueData));
  } else {
    alert(NO_ISSUE_SELECTED_MESSAGE);
  }
};
