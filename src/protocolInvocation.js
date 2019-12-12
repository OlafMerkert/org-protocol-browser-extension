import { assoc, curry, pipe } from "ramda";
import { getActiveTab, getSelectionFromTab, getUrlAndTitleFromTab } from "./activeTabData";
import { capture, copySelection, openInEmacsBrowser, sendMail, storeLink } from "./org";
import { detectCaptureTemplate } from "./automaticCaptureTemplateSelection";

const invokeWithUrlAndTitle = protocolHandler => async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  await protocolHandler(urlAndTitle);
  window.close();
};

const invokeWithUrlAndTitleAndSelection = protocolHandler => async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  const selection = await getSelectionFromTab(activeTab);
  await protocolHandler({ ...urlAndTitle, body: selection });
  window.close();
};

export const handleCapture = invokeWithUrlAndTitleAndSelection(capture);

const captureWithTemplate = curry(pipe(assoc("template"), capture));

export const handleCaptureWithTemplate = pipe(
  captureWithTemplate,
  invokeWithUrlAndTitleAndSelection
);

export const handleStoreLink = invokeWithUrlAndTitle(storeLink);
export const handleSendMail = invokeWithUrlAndTitle(sendMail);
export const handleOpenInEmacsBrowser = invokeWithUrlAndTitle(openInEmacsBrowser);

export const handleCopySelection = async () => {
  const activeTab = await getActiveTab();
  const selection = await getSelectionFromTab(activeTab);
  await copySelection({ selection });
  window.close();
};

export const handleAutomaticCapture = invokeWithUrlAndTitleAndSelection(
  pipe(detectCaptureTemplate, capture)
);
