import React from "react";

import "./Name.css";

export default function Name(props) {
  return (
    <div className="Name-container">
      <p className="Name-name">{props.currentName}</p>
    </div>
  );
}
