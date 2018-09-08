import { join, pick } from "ramda";

const getActiveTabFirefox = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    windowId: browser.windows.WINDOW_ID_CURRENT,
  });
  return tabs[0];
};

const getActiveTabChrome = () =>
  new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT,
      },
      tabs => resolve(tabs[0])
    );
  });

export const getActiveTab = window.browser ? getActiveTabFirefox : getActiveTabChrome;

export const getUrlAndTitleFromTab = pick(["url", "title"]);

const getSelectionFromTabFirefox = async tab => {
  const selection = await browser.tabs.executeScript(tab.id, {
    code: "getSelection().toString();",
  });
  return join("", selection);
};

const getSelectionFromTabChrome = tab =>
  new Promise((resolve, reject) => {
    chrome.tabs.executeScript(tab.id, { code: "getSelection().toString();" }, selection =>
      resolve(join("", selection))
    );
  });

export const getSelectionFromTab = window.browser
  ? getSelectionFromTabFirefox
  : getSelectionFromTabChrome;
