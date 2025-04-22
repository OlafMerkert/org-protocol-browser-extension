import { handleCapture, handleStoreLink, handleOpenInEmacsBrowser } from "./protocolInvocation";

const COMMANDS = {
  automaticCapture: "automatic-capture",
  storeLink: "store-link",
  openInEmacsBrowser: "open-in-emacs-browser",
};

const keyCommandHandler = (command) => {
  switch (command) {
    case COMMANDS.automaticCapture:
      return handleCapture();
    case COMMANDS.storeLink:
      return handleStoreLink();
    case COMMANDS.openInEmacsBrowser:
      return handleOpenInEmacsBrowser();
    default:
      return undefined;
  }
};

chrome.commands.onCommand.addListener(keyCommandHandler);
