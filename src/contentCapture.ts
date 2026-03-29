import { getActiveTab } from "./activeTabData";

const getJiraTaskFromTab = async (tab) => {
  const { status, ...data } = await chrome.tabs.sendMessage(tab.id, { kind: "grab-jira-task" });
  if (status === "issue-found") {
    return data;
  } else {
    return null;
  }
};

export const getJiraTask = async () => {
  const tab = await getActiveTab();
  return await getJiraTaskFromTab(tab);
};

export const getSelectionFromTab = async (tab) => {
  const { selection } = await chrome.tabs.sendMessage(tab.id, { kind: "grab-selection" });
  return selection;
};
