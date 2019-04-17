import React from "react";

import "./AddFriend.css";

export default function AddFriend(props) {
  if (props.myProfile === props.currentProfile) {
    return null;
  } else {
    return props.isAFriend === 1 ? (
      <div className="AddFriend-container">Already A Friend</div>
    ) : (
      <div className="AddFriend-container">
        <button
          onClick={() => {
            props.addFriend(props.currentProfile);
          }}
        >
          + Add Friend
        </button>
      </div>
    );
  }
}
