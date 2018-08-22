import React from "react";
import { render } from "react-dom";
import { capture } from "./org";
import { getActiveTab, getUrlAndTitleFromTab } from "./activeTabData";

const handleCapture = async () => {
  const activeTab = await getActiveTab();
  await capture(getUrlAndTitleFromTab(activeTab));
};

const App = props => (
  <div>
    <button onClick={handleCapture}>Capture</button>
  </div>
);

render(<App />, document.getElementById("root-node"));
