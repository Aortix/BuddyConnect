import React, { Component } from "react";

import "./Friends.css";

class Friends extends Component {
  handleFriendClick = profileId => {
    this.props.history.push(`/profile/${profileId}`);
    this.props.getAndStoreAProfile(profileId);
  };

  render() {
    if (this.props.friendThumbnails === null) {
      return null;
    } else {
      return (
        <div
          className={`Friends-container ${this.props.className}`}
          id={this.props.id}
        >
          {this.props.friendThumbnails.map(friends => {
            return (
              <div
                className="friend-icon"
                key={friends.profileId}
                onClick={() => this.handleFriendClick(friends.profileId)}
              >
                <img
                  src={`http://localhost:5000/uploads/avatars/${
                    friends.avatar
                  }`}
                  alt="Friend"
                />
                <p>{friends.name}</p>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default Friends;
