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
