import { handleCopyBranchNameToClipboard, handleCopyIssueNumbersToClipboard } from "./clipboard";
import {
  handleCapture,
  handleCopySelection,
  handleCreateBranchFromIssue,
  handleFindGitLogs,
  handleOpenInEmacsBrowser,
  handleSendMail,
  handleStoreLink,
  handleTimesheetEntryForIssue,
} from "./protocolInvocation";

const handlers = {
  handleCapture,
  handleCopySelection,
  handleCreateBranchFromIssue,
  handleFindGitLogs,
  handleOpenInEmacsBrowser,
  handleSendMail,
  handleStoreLink,
  handleTimesheetEntryForIssue,
  handleCopyBranchNameToClipboard,
  handleCopyIssueNumbersToClipboard,
};

const isValidHandler = (handlerName: string | null): handlerName is keyof typeof handlers =>
  handlerName !== null && handlerName in handlers;

function registerActionHandlers() {
  for (const button of document.getElementsByTagName("button")) {
    const handlerName = button.getAttribute("data-handler");
    if (isValidHandler(handlerName)) {
      button.addEventListener("click", () => {
        handlers[handlerName]();
      });
    }
  }
}

window.addEventListener("load", registerActionHandlers);
