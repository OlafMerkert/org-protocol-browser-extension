import { join, pick } from "ramda";

const tabsQuery = window.browser
  ? browser.tabs.query
  : payload => new Promise(resolve => chrome.tabs.query(payload, resolve));

const tabExecuteScript = window.browser
  ? browser.tabs.executeScript
  : (tabId, payload) => new Promise(resolve => chrome.tabs.executeScript(tabId, payload, resolve));

export const getActiveTab = async () => {
  let tabs = await tabsQuery({
    active: true,
    lastFocusedWindow: true,
  });
  return tabs[0];
};

export const getUrlAndTitleFromTab = pick(["url", "title"]);

export const getSelectionFromTab = async tab => {
  const selection = await tabExecuteScript(tab.id, {
    code: "getSelection().toString();",
  });
  return join("", selection);
};
