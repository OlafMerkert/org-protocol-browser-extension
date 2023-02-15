import React from "react";
import { createRoot } from "react-dom/client";
import { ActionList } from "./components/ActionList";
import { FrequentAction } from "./components/FrequentAction";
import { RareAction } from "./components/RareAction";
import {
  handleAutomaticCapture,
  handleCapture,
  handleCaptureWithTemplate,
  handleCopySelection,
  handleOpenInEmacsBrowser,
  handleSendMail,
  handleStoreLink,
} from "./protocolInvocation";
import "./popup.css";
import { handleCopyIssueNumbersToClipboard } from "./clipboard";

const App = function () {
  return (
    <ActionList>
      <FrequentAction handler={handleCopyIssueNumbersToClipboard} label="Copy JIRA IDs" />
      <FrequentAction handler={handleAutomaticCapture} label="Automatic Capture" />
      <FrequentAction handler={handleStoreLink} label="Store Link" />
      <RareAction handler={handleCapture} label="Capture" />
      <RareAction handler={handleCopySelection} label="Copy Selection" />
      <RareAction handler={handleSendMail} label="Send Mail" />
      <RareAction handler={handleOpenInEmacsBrowser} label="Open in eww" />
      <RareAction handler={handleCaptureWithTemplate("R")} label="Capture PR" />
      <RareAction handler={handleCaptureWithTemplate("J")} label="Capture JIRA task" />
    </ActionList>
  );
};

const rootContainer = document.createElement("div");
document.body.appendChild(rootContainer);
const root = createRoot(rootContainer);
root.render(<App />);
