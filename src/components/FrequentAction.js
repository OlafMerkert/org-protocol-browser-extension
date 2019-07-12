import React from "react";

const frequentActionStyle = {
  width: "12rem",
  height: "4.2rem",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16pt",
  gridRow: "span 2",
};

export const FrequentAction = ({ label, handler }) => (
  <button style={frequentActionStyle} onClick={handler}>
    {label}
  </button>
);
