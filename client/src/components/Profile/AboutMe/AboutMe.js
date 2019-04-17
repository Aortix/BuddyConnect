import React from "react";

export default function AboutMe(props) {
  return (
    <div className={props.className} id={props.id}>
      {props.currentAboutMe}
    </div>
  );
}
