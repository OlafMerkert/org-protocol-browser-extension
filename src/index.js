import React from "react";
import { render } from "react-dom";
import { capture } from "./org";

const handleCapture = async () => {
  const tabs = await browser.tabs
        .query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT });
      const { url, title } = tabs[0];
  await capture({
        url,
        title,
      });
};

const App = props => (
  <div>
    <button onClick={handleCapture}>Capture</button>
  </div>
);

render(<App />, document.getElementById("root-node"));
