import { capture, storeLink, copySelection, sendMail, openInEmacsBrowser } from "./org";
import { getActiveTab, getSelectionFromTab, getUrlAndTitleFromTab } from "./activeTabData";

const invokeWithUrlAndTitle = protocolHandler => async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  await protocolHandler(urlAndTitle);
};

export const handleCapture = async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  const selection = await getSelectionFromTab(activeTab);
  await capture({ ...urlAndTitle, body: selection });
};

export const handleStoreLink = invokeWithUrlAndTitle(storeLink);
export const handleSendMail = invokeWithUrlAndTitle(sendMail);
export const handleOpenInEmacsBrowser = invokeWithUrlAndTitle(openInEmacsBrowser);

export const handleCopySelection = async () => {
  const activeTab = await getActiveTab();
  const selection = await getSelectionFromTab(activeTab);
  await copySelection({ selection });
};
