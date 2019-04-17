import React, { Component } from "react";

class Friends extends Component {
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
              <div key={friends.profileId}>
                <p>{friends.avatar}</p>
                <p>{friends.profileId}</p>
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
