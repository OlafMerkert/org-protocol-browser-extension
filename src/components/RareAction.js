import React from "react";

const rareActionStyle = {
  width: "10rem",
  height: "2rem",
  textAlign: "center",
};

export const RareAction = ({ label, handler }) => (
  <button style={rareActionStyle} onClick={handler}>
    {label}
  </button>
);
