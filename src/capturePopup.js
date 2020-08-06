import React from "react";
import { render } from "react-dom";
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

const App = (props) => (
  <ActionList>
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

const rootNode = document.createElement("div");
document.body.appendChild(rootNode);
render(<App />, rootNode);
