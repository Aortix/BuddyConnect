import React from "react";

import "./HeaderImage.css";

export default function HeaderImage(props) {
  return (
    <div className="HeaderImage-container">{props.currentHeaderImage}</div>
  );
}
