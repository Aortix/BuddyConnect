import React, { Component } from "react";
import CreateComment from "./../CreateComment/CreateComment";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Post extends Component {
  state = {
    commentText: ""
  };

  changeCommentText = e => {
    this.setState({ commentText: e.target.value });
  };

  submitCommentForm = e => {
    e.preventDefault();
    this.props.createComment(this.state.commentText, this.props.current_post);
    this.props.changePostId("");
    this.setState({ commentText: "" });
  };

  render() {
    if (this.props.friendsPosts === undefined) {
      return (
        <div>
          {this.props.globalPosts.map(post => {
            return (
              <div key={post._id}>
                <strong
                  onClick={() => {
                    this.props.changePage(post.p_id);
                  }}
                >
                  {post.name}
                </strong>
                <br />
                {post.post}
                {post.comments.map(comments => {
                  return (
                    <div key={comments._id}>
                      <em
                        onClick={() => {
                          this.props.changePage(comments.p_id);
                        }}
                      >
                        {comments.commenterName}
                      </em>
                      <br />
                      {comments.commenterComment}
                    </div>
                  );
                })}
                <br />
                {post._id !== this.props.current_post ? (
                  <button
                    onClick={() => {
                      this.props.changePostId(post._id);
                    }}
                  >
                    Add Comment
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        this.props.changePostId("");
                      }}
                    >
                      Close Comment.
                    </button>
                    <CreateComment
                      submitCommentForm={this.submitCommentForm}
                      commentText={this.state.commentText}
                      changeCommentText={this.changeCommentText}
                    />
                  </div>
                )}
                <br />
              </div>
            );
          })}
        </div>
      );
    } else if (this.props.globalPosts === undefined) {
      return (
        <div>
          {this.props.friendsPosts.map(post => {
            return (
              <div key={post._id}>
                <strong>{post.name}</strong>
                <br />
                {post.post}
                {post.comments.map(comments => {
                  return (
                    <div key={comments._id}>
                      <em>{comments.commenterName}</em>
                      <br />
                      {comments.commenterComment}
                    </div>
                  );
                })}
                <br />
                {post._id !== this.props.current_post ? (
                  <button
                    onClick={() => {
                      this.props.changePostId(post._id);
                    }}
                  >
                    Add Comment
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        this.props.changePostId("");
                      }}
                    >
                      Close Comment.
                    </button>
                    <CreateComment
                      submitCommentForm={this.submitCommentForm}
                      commentText={this.state.commentText}
                      changeCommentText={this.changeCommentText}
                    />
                  </div>
                )}
                <br />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default Post;
