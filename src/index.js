import React from "react";
import { render } from "react-dom";
import {
  handleCapture,
  handleStoreLink,
  handleCopySelection,
  handleSendMail,
  handleOpenInEmacsBrowser,
} from "./protocolInvocation";

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
    <div>
      <button onClick={handleCaptureWithTemplate("J")}>Capture JIRA task</button>
    </div>
    <div>
      <button onClick={handleCaptureWithTemplate("R")}>Capture Pull Request</button>
    </div>
  </div>
);

render(<App />, document.getElementById("root-node"));
