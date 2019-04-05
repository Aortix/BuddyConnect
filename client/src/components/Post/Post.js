import React, { Component } from "react";

export default class Post extends Component {
  render() {
    if (this.props.posts === null) {
      return null;
    } else {
      return (
        <div>
          {this.props.posts.map(post => {
            return (
              <div key={post._id}>
                {post.post}
                {post.comments.map(comments => {
                  return <div key={comments._id}>{comments.userComment}</div>;
                })}
                <br />
              </div>
            );
          })}
        </div>
      );
    }
  }
}
