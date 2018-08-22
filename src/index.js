import React from "react";
import { render } from "react-dom";
import {
  getActiveTab,
  getSelectionFromTab,
  getUrlAndTitleFromTab,
  invokeWithUrlAndTitle,
} from "./activeTabData";
import { capture, storeLink, copySelection, sendMail, openInEmacsBrowser } from "./org";

const handleCapture = async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  const selection = await getSelectionFromTab(activeTab);
  await capture({ ...urlAndTitle, body: selection });
};

const handleStoreLink = invokeWithUrlAndTitle(storeLink);
const handleSendMail = invokeWithUrlAndTitle(sendMail);
const handleOpenInEmacsBrowser = invokeWithUrlAndTitle(openInEmacsBrowser);

const handleCopySelection = async () => {
  const activeTab = await getActiveTab();
  const selection = await getSelectionFromTab(activeTab);
  await copySelection({ selection });
};

const App = props => (
  <div>
    <div>
      <button onClick={handleCapture}>Capture</button>
    </div>
    <div>
      <button onClick={handleStoreLink}>Store Link</button>
    </div>
    <div>
      <button onClick={handleCopySelection}>Copy Selection</button>
    </div>
    <div>
      <button onClick={handleSendMail}>Send Mail</button>
    </div>
    <div>
      <button onClick={handleOpenInEmacsBrowser}>Open in eww</button>
    </div>
  </div>
);

render(<App />, document.getElementById("root-node"));
