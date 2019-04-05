import React, { Component } from "react";

export default class Post extends Component {
  render() {
    if (this.props.posts === null) {
      return null;
    } else {
      return (
        <div>
          {this.props.posts.map(post => {
            return <p key={post._id}>{post.post}</p>;
          })}
        </div>
      );
    }
  }
}
