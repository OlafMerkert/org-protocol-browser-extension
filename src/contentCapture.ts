import { getActiveTab } from "./activeTabData";
import type { IssueData } from "./types";

const getJiraTaskFromTab = async (tab: chrome.tabs.Tab): Promise<IssueData | null> => {
  const { status, ...data } = await chrome.tabs.sendMessage(tab.id!, { kind: "grab-jira-task" });
  if (status === "issue-found") {
    return data as IssueData;
  } else {
    return null;
  }
};

export const getJiraTask = async (): Promise<IssueData | null> => {
  const tab = await getActiveTab();
  if (!tab) return null;
  return await getJiraTaskFromTab(tab);
};
