import React from "react";

const actionListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(5, 1fr)",
  gridAutoFlow: "column",
  gridGap: "0.2rem",
};

export const ActionList = ({ children }) => <div style={actionListStyle}>{children}</div>;
