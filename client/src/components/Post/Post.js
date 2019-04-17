import React, { Component } from "react";
import CreateComment from "./../CreateComment/CreateComment";

import "./Post.css";

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
      <div className={`Post-container`} id={`${this.props.id}`}>
        {this.props.posts.map(post => {
          return (
            <div key={post._id}>
              <div className="Post-specifics">
                <h3
                  onClick={() => {
                    this.props.changeLocation(post.p_id);
                  }}
                >
                  {post.name}
                </h3>
                <br />
                <p>{post.post}</p>
              </div>
              {post.comments.map(comments => {
                return (
                  <div className="comment-specifics" key={comments._id}>
                    <h4
                      onClick={() => {
                        this.props.changeLocation(comments.commenterP_id);
                      }}
                    >
                      {comments.commenterName}
                    </h4>
                    <br />
                    <p>{comments.commenterComment}</p>
                  </div>
                );
              })}

              {post._id !== this.props.currentPost ? (
                <div className="add-comment-button-container">
                  <button
                    className="add-comment-button"
                    onClick={() => {
                      this.changeCurrentFocusedPost(post._id);
                    }}
                  >
                    Add Comment
                  </button>
                </div>
              ) : (
                <div>
                  <div className="add-comment-button-container">
                    <button
                      className="add-comment-button"
                      onClick={() => {
                        this.changeCurrentFocusedPost("");
                      }}
                    >
                      Close Comment
                    </button>
                  </div>
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
