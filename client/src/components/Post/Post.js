import React, { Component } from "react";
import CreateComment from "./../CreateComment/CreateComment";

class Post extends Component {
  state = {
    profileClick: false
  };

  changeToProfilePage = pageId => {
    this.props.getAndStoreAProfile(pageId);
  };

  changeCurrentFocusedPost = postId => {
    this.props.changeCurrentFocusedPost(postId);
  };

  render() {
    return this.props.posts === null ? (
      <h1>Loading</h1>
    ) : (
      <div>
        {this.props.posts.map(post => {
          return (
            <div key={post._id}>
              <strong
                onClick={() => {
                  this.props.changeLocation(post.p_id);
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
                        this.props.changeLocation(comments.commenterP_id);
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
              {post._id !== this.props.currentPost ? (
                <button
                  onClick={() => {
                    this.changeCurrentFocusedPost(post._id);
                  }}
                >
                  Add Comment
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      this.changeCurrentFocusedPost("");
                    }}
                  >
                    Close Comment.
                  </button>
                  <CreateComment
                    currentProfile={this.props.currentProfile}
                    currentPost={this.props.currentPost}
                    changeCurrentFocusedPost={this.changeCurrentFocusedPost}
                    getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
                    createComment={this.props.createComment}
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

export default Post;
