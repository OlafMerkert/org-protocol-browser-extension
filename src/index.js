import React from "react";
import { render } from "react-dom";
import { getActiveTab, getSelectionFromTab, getUrlAndTitleFromTab } from "./activeTabData";
import { capture } from "./org";

const handleCapture = async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  const selection = await getSelectionFromTab(activeTab);
  await capture({ ...urlAndTitle, body: selection });
};

const App = props => (
  <div>
    <button onClick={handleCapture}>Capture</button>
  </div>
);

render(<App />, document.getElementById("root-node"));
