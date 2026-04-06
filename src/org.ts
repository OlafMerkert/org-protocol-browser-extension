import { join, map, pipe, toPairs } from "ramda";
import { getActiveTab } from "./activeTabData";

export const orgProtocolUrlBuilder = (name: string) => {
  const baseUrl = `org-protocol://${name}`;
  const prependBaseUrl = (parameters: string) =>
    parameters ? `${baseUrl}?${parameters}` : baseUrl;
  const encodeParameter = ([name, value]: [string, string]) =>
    `${name}=${encodeURIComponent(value)}`;

  return pipe(toPairs, map(encodeParameter), join("&"), prependBaseUrl);
};

const openUrl = async (url: string) => {
  const activeTab = await getActiveTab();
  if (activeTab?.id !== undefined) {
    chrome.tabs.update(activeTab.id, { url });
  }
};

const openOrgProtocolUrl = (name: string) => pipe(orgProtocolUrlBuilder(name), openUrl);

export const capture = openOrgProtocolUrl("capture");
export const storeLink = openOrgProtocolUrl("store-link");
export const openInEmacsBrowser = openOrgProtocolUrl("textbrowser");
export const copySelection = openOrgProtocolUrl("cpsel");
export const sendMail = openOrgProtocolUrl("email");
export const timesheet = openOrgProtocolUrl("timesheet");
export const createBranch = openOrgProtocolUrl("create-branch");
export const findGitLogs = openOrgProtocolUrl("issue-git-logs");
