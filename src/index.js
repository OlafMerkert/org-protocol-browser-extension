import React from "react";
import { render } from "react-dom";

const capture = ({ url: rawUrl, title: rawTitle, body: rawBody }) => {
  const url = encodeURIComponent(rawUrl);
  const title = encodeURIComponent(rawTitle);
  const body = encodeURIComponent(rawBody);
  const captureUrl = `org-protocol://capture?url=${url}&title=${title}&body=${body}`;
  return browser.tabs.update({ url: captureUrl });
};

const handle = async () => {
  const tabs = await browser.tabs
        .query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT });
      const { url, title } = tabs[0];
  await capture({
        url,
        title,
        body: ""
      });
};

const App = props => (
  <div>
    <button onClick={handle}>Click</button>
  </div>
);

render(<App />, document.getElementById("root-node"));
