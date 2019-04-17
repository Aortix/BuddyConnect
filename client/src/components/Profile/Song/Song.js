import React from "react";

import "./Song.css";

export default function Song(props) {
  return <div className="Song-container">{props.currentSong}</div>;
}
