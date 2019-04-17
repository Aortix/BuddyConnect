import React from "react";

import "./Avatar.css";

export default function Avatar(props) {
  return <div className="Avatar-container">{props.currentAvatar}</div>;
}
