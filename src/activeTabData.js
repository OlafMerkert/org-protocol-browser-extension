import { pick } from "ramda";

export const getActiveTab = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    windowId: browser.windows.WINDOW_ID_CURRENT,
  });
  return tabs[0];
};

export const getUrlAndTitleFromTab = pick(["url", "title"]);
