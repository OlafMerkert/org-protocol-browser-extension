import React from "react";
import { Button } from "@blueprintjs/core";

const rareActionStyle = {
  width: "8rem",
  height: "2rem",
  textAlign: "center",
};

export const RareAction = ({ label, handler }) => (
  <Button style={rareActionStyle} onClick={handler}>
    {label}
  </Button>
);
