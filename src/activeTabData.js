import { join, pick } from "ramda";

export const getActiveTab = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    windowId: browser.windows.WINDOW_ID_CURRENT,
  });
  return tabs[0];
};

export const getUrlAndTitleFromTab = pick(["url", "title"]);

export const getSelectionFromTab = async tab => {
  const selection = await browser.tabs.executeScript(tab.id, {
    code: "getSelection().toString();",
  });
  return join("", selection);
};

export const invokeWithUrlAndTitle = protocolHandler => async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  await protocolHandler(urlAndTitle);
};
