import React from "react";
import { render } from "react-dom";
import { getActiveTab, getSelectionFromTab, getUrlAndTitleFromTab } from "./activeTabData";
import { capture, storeLink } from "./org";

const handleCapture = async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  const selection = await getSelectionFromTab(activeTab);
  await capture({ ...urlAndTitle, body: selection });
};

const handleStoreLink = async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  await storeLink(urlAndTitle);
};

const App = props => (
  <div>
    <div>
      <button onClick={handleCapture}>Capture</button>
    </div>
    <div>
      <button onClick={handleStoreLink}>Store Link</button>
    </div>
  </div>
);

render(<App />, document.getElementById("root-node"));
