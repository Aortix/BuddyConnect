import React from "react";

import "./Avatar.css";

export default function Avatar(props) {
  return <div className="Avatar-container">
  <img src={`http://localhost:5000/uploads/avatars/${props.currentAvatar}`} alt="Avatar" /></div>;
}
