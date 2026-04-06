import { pick } from "ramda";

const tabsQuery = (payload: chrome.tabs.QueryInfo) =>
  new Promise<chrome.tabs.Tab[]>((resolve) => chrome.tabs.query(payload, resolve));

export const getActiveTab = async () => {
  const tabs = await tabsQuery({
    active: true,
    lastFocusedWindow: true,
  });
  return tabs[0];
};

export const getUrlAndTitleFromTab = pick(["url", "title"]);

export const getSelectionFromTab = async (tab: chrome.tabs.Tab) => {
  const { selection } = await chrome.tabs.sendMessage(tab.id!, { kind: "grab-selection" });
  return selection;
};
