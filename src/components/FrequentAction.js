import React from "react";

export const FrequentAction = ({ label, handler }) => (
  <div>
    <button onClick={handler}>{label}</button>
  </div>
);
