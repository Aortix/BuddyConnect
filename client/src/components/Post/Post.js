import React, { Component } from "react";
import CreateComment from "./../CreateComment/CreateComment";

export default class Post extends Component {
  state = {
    commentClicked: ""
  };

  buttonClicked = () => {
    this.setState({ commentClicked: !this.state.commentClicked });
  };

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
                    return (
                      <div key={comments._id}>
                        <strong>{comments.commenterName}</strong>
                        <br />
                        {comments.commenterComment}
                      </div>
                    );
                  })}
                  <br />
                  {post.addComment === false ? (
                    <button
                      onClick={() => {
                        this.props.changeAddComment(post._id);
                        this.props.changePostId(post._id);
                      }}
                    >
                      Add Comment
                    </button>
                  ) : (
                    <div>
                      <button
                        onClick={() => this.props.changeAddComment(post._id)}
                      >
                        Close Comment.
                      </button>
                      <CreateComment
                        submitCommentForm={this.props.submitCommentForm}
                        commentText={this.props.commentText}
                        changeCommentText={this.props.changeCommentText}
                        commentClicked={this.state.commentClicked}
                        buttonClicked={this.buttonClicked}
                        postId={post._id}
                      />
                    </div>
                  )}
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
