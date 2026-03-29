import { pick } from "ramda";

const tabsQuery = (payload) => new Promise((resolve) => chrome.tabs.query(payload, resolve));

export const getActiveTab = async () => {
  let tabs = await tabsQuery({
    active: true,
    lastFocusedWindow: true,
  });
  return tabs[0];
};

export const getUrlAndTitleFromTab = pick(["url", "title"]);

export const getSelectionFromTab = async (tab) => {
  const { selection } = await chrome.tabs.sendMessage(tab.id, { kind: "grab-selection" });
  return selection;
};
