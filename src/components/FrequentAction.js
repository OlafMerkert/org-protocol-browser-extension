import React from "react";
import { Button } from "@blueprintjs/core";

const frequentActionStyle = {
  width: "8rem",
  height: "4rem",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16pt",
  gridRow: "span 2",
};

export const FrequentAction = ({ label, handler }) => (
  <Button style={frequentActionStyle} intent="primary" large={true} onClick={handler}>
    {label}
  </Button>
);
