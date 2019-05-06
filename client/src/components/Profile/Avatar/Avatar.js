import React from "react";

import "./Avatar.css";

export default function Avatar(props) {
  return props.currentProfile === props.myProfile ? (
    <div className="Avatar-container">
      <img
        id="Avatar-avatar"
        src={`https://s3-us-west-2.amazonaws.com/buddyconnectbucket/${
          props.currentAvatar
        }`}
        alt="Avatar"
      />
    </div>
  ) : (
    <div className="Avatar-container">
      <img
        src={`https://s3-us-west-2.amazonaws.com/buddyconnectbucket/${
          props.currentAvatar
        }`}
        alt="Avatar"
      />
    </div>
  );
}
