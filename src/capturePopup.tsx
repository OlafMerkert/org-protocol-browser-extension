import React from "react";
import { createRoot } from "react-dom/client";
import { handleCopyBranchNameToClipboard, handleCopyIssueNumbersToClipboard } from "./clipboard";
import { ActionList } from "./components/ActionList";
import { FrequentAction } from "./components/FrequentAction";
import { RareAction } from "./components/RareAction";
import "./popup.css";
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

const App = function () {
  return (
    <ActionList>
      <FrequentAction handler={handleCopyIssueNumbersToClipboard} label="Copy Issue IDs" />
      <FrequentAction handler={handleTimesheetEntryForIssue} label="Book Issue Time" />
      <FrequentAction handler={handleCapture} label="Capture" />
      <FrequentAction handler={handleStoreLink} label="Store Link" />
      <RareAction handler={handleCreateBranchFromIssue} label="Create Branch" />
      <RareAction handler={handleCopyBranchNameToClipboard} label="Copy Branch Name" />
      <RareAction handler={handleFindGitLogs} label="Find Issue Commits" />
      <RareAction handler={handleCopySelection} label="Copy Selection" />
      <RareAction handler={handleSendMail} label="Send Mail" />
      <RareAction handler={handleOpenInEmacsBrowser} label="Open in eww" />
    </ActionList>
  );
};

const rootContainer = document.createElement("div");
document.body.appendChild(rootContainer);
const root = createRoot(rootContainer);
root.render(<App />);
