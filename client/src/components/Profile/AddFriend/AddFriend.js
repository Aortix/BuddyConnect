import React from "react";

import "./AddFriend.css";

export default function AddFriend(props) {
  if (props.myProfile === props.currentProfile) {
    return null;
  } else {
    return props.isAFriend === 1 ? (
      <div
        className="AddFriend-container"
        onClick={() =>
          props.deleteFriend(props.currentProfile, props.friendsPosts.length)
        }
      >
        <i className="fas fa-user-friends" />
        <span className="AddFriend-friends">&nbsp;Del</span>
      </div>
    ) : (
      <div
        className="AddFriend-container"
        onClick={() => {
          props.addFriend(props.currentProfile, props.friendsPosts.length);
        }}
      >
        <i className="fas fa-user-friends" />
        <span className="AddFriends-add_friends">&nbsp;Add</span>
      </div>
    );
  }
}
