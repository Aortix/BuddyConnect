import React, { Component } from "react";
import CreateComment from "./../CreateComment/CreateComment";

export default class Post extends Component {
  render() {
    if (this.props.posts === null) {
      return null;
    } else {
      if (this.props.location === "global") {
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
                  <CreateComment
                    submitPostForm={this.props.submitPostForm}
                    postText={this.props.postText}
                    changePostText={this.props.changePostText}
                  />
                  <br />
                </div>
              );
            })}
          </div>
        );
      } else if (this.props.location === "posts") {
        return <div>This is your friends posts!</div>;
      } else {
        return <div>What happened</div>;
      }
    }
  }
}
