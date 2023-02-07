import React, { useState } from "react";
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
import { getActiveTab } from "./activeTabData";

const handleSendMessage = async (set) => {
  const tab = await getActiveTab();
  const response = await chrome.tabs.sendMessage(tab.id, { kind: "grab-jira-task" });
  set(JSON.stringify(response));
};

const App = function () {
  const [output, setOutput] = useState("initial");
  return (
    <ActionList>
      {output}
      <FrequentAction handler={handleAutomaticCapture} label="Automatic Capture" />
      <FrequentAction handler={handleStoreLink} label="Store Link" />
      <FrequentAction handler={() => handleSendMessage(setOutput)} label="timekeep JIRA task" />
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
