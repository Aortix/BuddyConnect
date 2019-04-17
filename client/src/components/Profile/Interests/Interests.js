import React from "react";

export default function Interests(props) {
  return (
    <div className={props.className} id={props.id}>
      {props.currentInterests}
    </div>
  );
}
