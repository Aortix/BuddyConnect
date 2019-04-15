import React from "react";

export default function AddFriend(props) {
  if (props.myProfile === props.currentProfile) {
    return null;
  } else {
    return props.isAFriend === 1 ? (
      <div>Already A Friend</div>
    ) : (
      <div>
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
