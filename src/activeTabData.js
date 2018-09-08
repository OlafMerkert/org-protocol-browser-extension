import { join, pick } from "ramda";

const getCurrentWindowId = () => (window.browser || chrome).windows.WINDOW_ID_CURRENT;

const tabsQuery = window.browser
  ? browser.tabs.query
  : payload => new Promise(resolve => chrome.tabs.query(payload, resolve));

const tabExecuteScript = window.browser
  ? browser.tabs.executeScript
  : (tabId, payload) => new Promise(resolve => chrome.tabs.executeScript(tabId, payload, resolve));

export const getActiveTab = async () => {
  const tabs = await tabsQuery({
    active: true,
    windowId: getCurrentWindowId(),
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
