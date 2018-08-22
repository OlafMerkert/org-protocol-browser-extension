import React from "react";

export const RareAction = ({ label, handler }) => (
  <div>
    <button onClick={handler}>{label}</button>
  </div>
);
