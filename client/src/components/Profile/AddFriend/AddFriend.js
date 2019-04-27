import React from "react";

import "./AddFriend.css";

export default function AddFriend(props) {
  if (props.myProfile === props.currentProfile) {
    return null;
  } else {
    return props.isAFriend === 1 ? (
      <div
        className="AddFriend-container"
        onClick={() => props.deleteFriend(props.currentProfile)}
      >
        <i className="fas fa-user-friends" />
        <span>&nbsp;Friends</span>
      </div>
    ) : (
      <div
        className="AddFriend-container"
        onClick={() => {
          props.addFriend(props.currentProfile);
        }}
      >
        <i className="fas fa-user-friends" />
        <span>&nbsp;Add Friend</span>
      </div>
    );
  }
}
