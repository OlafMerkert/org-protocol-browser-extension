import React from "react";

const frequentActionStyle = {
  width: "10rem",
  height: "4rem",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16pt",
  gridRow: "span 2",
};

export const FrequentAction = ({ label, handler }) => (
  <button style={frequentActionStyle} intent="primary" large={true} onClick={handler}>
    {label}
  </button>
);
