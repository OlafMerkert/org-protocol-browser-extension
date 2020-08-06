import {
  handleAutomaticCapture,
  handleStoreLink,
  handleOpenInEmacsBrowser,
} from "./protocolInvocation";

const COMMANDS = {
  automaticCapture: "automatic-capture",
  storeLink: "store-link",
  openInEmacsBrowser: "open-in-emacs-browser",
};

const keyCommandHandler = (command) => {
  switch (command) {
    case COMMANDS.automaticCapture:
      return handleAutomaticCapture();
    case COMMANDS.storeLink:
      return handleStoreLink();
    case COMMANDS.openInEmacsBrowser:
      return handleOpenInEmacsBrowser();
    default:
      return undefined;
  }
};

(window.browser || chrome).commands.onCommand.addListener(keyCommandHandler);
