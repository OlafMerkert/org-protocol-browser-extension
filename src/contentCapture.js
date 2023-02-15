import { getActiveTab } from "./activeTabData";

export const getJiraTask = async () => {
  const tab = await getActiveTab();
  const { status, ...data } = await chrome.tabs.sendMessage(tab.id, { kind: "grab-jira-task" });
  if (status === "issue-found") {
    return data;
  } else {
    return null;
  }
};
