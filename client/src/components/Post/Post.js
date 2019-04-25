import React, { Component } from "react";
import moment from "moment";
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

  deletePost = (postId, currentProfile) => {
    this.props.deletePost(postId, currentProfile);
  };

  deleteComment = (commentId, postId, currentProfile) => {
    this.props.deleteComment(commentId, postId, currentProfile);
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
                <p>{moment(post.datePosted).format("MM/DD/YYYY hh:mmA")}</p>
                {this.props.myProfile === post.p_id ? (
                  <button
                    onClick={() =>
                      this.deletePost(post._id, this.props.currentProfile)
                    }
                  >
                    Delete Post
                  </button>
                ) : null}
                <div
                  className="post-image-and-name"
                  onClick={() => {
                    this.props.changeLocation(post.p_id);
                  }}
                >
                  <img
                    width="27"
                    height="27"
                    src={`http://localhost:5000/uploads/avatars/${post.avatar}`}
                    alt="avatar"
                  />
                  <h3>{post.name}</h3>
                </div>
                <br />
                <p>{post.post}</p>
              </div>
              {post.comments.map(comments => {
                return (
                  <div className="comment-specifics" key={comments._id}>
                    <p>
                      {moment(comments.datePosted).format("MM/DD/YYYY hh:mmA")}
                    </p>
                    {this.props.myProfile === comments.commenterP_id ? (
                      <button
                        onClick={() =>
                          this.deleteComment(
                            comments._id,
                            post._id,
                            this.props.currentProfile
                          )
                        }
                      >
                        Delete Comment
                      </button>
                    ) : null}
                    <div
                      onClick={() => {
                        this.props.changeLocation(comments.commenterP_id);
                      }}
                    >
                      <img
                        width="26"
                        height="26"
                        src={`http://localhost:5000/uploads/avatars/${
                          comments.commenterAvatar
                        }`}
                        alt="avatar"
                      />
                      <h4>{comments.commenterName}</h4>
                    </div>
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
                    commentErrors={this.props.commentErrors}
                    clearCommentErrors={this.props.clearCommentErrors}
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
