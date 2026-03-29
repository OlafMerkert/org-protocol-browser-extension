import React from "react";

const actionListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(*, 1fr)",
  gridAutoFlow: "row",
  gridGap: "0.2rem",
};

export const ActionList = ({ children }) => <div style={actionListStyle}>{children}</div>;
