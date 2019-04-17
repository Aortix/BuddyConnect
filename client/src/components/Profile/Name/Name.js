import React from "react";

import "./Name.css";

export default function Name(props) {
  return <div className="Name-container">{props.currentName}</div>;
}
