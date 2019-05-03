import React, { Component } from "react";
import moment from "moment";
import CreateComment from "./../CreateComment/CreateComment";
import CreatePost from "./../CreatePost/CreatePost";

import isEmpty from "./../../utilities/isEmpty";
import "./Post.css";

class Post extends Component {
  componentDidMount = () => {
    this.props.postAlreadyDeleted();
    this.props.commentAlreadyDeleted();
  };

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
    document.getElementById(postId).classList.toggle("postDeleted");

    setTimeout(() => this.props.deletePost(postId, currentProfile), 1000);
  };

  deleteComment = (commentId, postId, currentProfile) => {
    document.getElementById(commentId).classList.toggle("commentDeleted");

    setTimeout(
      () => this.props.deleteComment(commentId, postId, currentProfile),
      1000
    );
  };

  render() {
    return isEmpty(this.props.posts) === true ? (
      <div className="no-posts-container">
        <div className="no-posts-text">
          <span>Hey there!&nbsp;</span>
          <i class="far fa-hand-peace" />

          <p>
            I'm glad you're with us! This place might seem a little empty at the
            moment, but if you head over to the global tab and add some friends,
            you'll be surprised at how fast it fills up!
          </p>
        </div>
        <i class="far fa-smile-beam fa-3x" />
      </div>
    ) : (
      <div
        className={`Post-container ${this.props.className}`}
        id={this.props.id}
      >
        {this.props.posts.map(post => {
          return (
            <div id={post._id} key={post._id}>
              <div className="post-specifics">
                <div className="post-post_information">
                  <p className="post-date">
                    {moment(post.datePosted).format("MM/DD/YYYY hh:mmA")}
                  </p>
                  {this.props.myProfile === post.p_id ? (
                    <i
                      id="post-delete_icon"
                      className="fas fa-minus-circle fa-2x"
                      onClick={() =>
                        this.deletePost(post._id, this.props.currentProfile)
                      }
                    />
                  ) : null}
                  <div
                    className="post-image_post-name"
                    onClick={() => {
                      this.props.changeLocation(post.p_id);
                    }}
                  >
                    <img
                      className="post-avatar_image"
                      width="27"
                      height="30"
                      src={`http://localhost:5000/uploads/avatars/${
                        post.avatar
                      }`}
                      alt="avatar"
                    />
                    <h3 className="post-name">{post.name}</h3>
                  </div>
                </div>
                <p className="post-post_content">{post.post}</p>
              </div>
              {post.comments.map(comments => {
                return (
                  <div
                    id={comments._id}
                    className="comment-specifics"
                    key={comments._id}
                  >
                    <div className="comment-comment_information">
                      <p className="comment-date">
                        {moment(comments.datePosted).format(
                          "MM/DD/YYYY hh:mmA"
                        )}
                      </p>
                      {this.props.myProfile === comments.commenterP_id ? (
                        <i
                          id="post-delete_comment"
                          className="fas fa-minus-circle fa-lg"
                          onClick={() =>
                            this.deleteComment(
                              comments._id,
                              post._id,
                              this.props.currentProfile
                            )
                          }
                        />
                      ) : null}
                      <div
                        className="comment-image_comment-name"
                        onClick={() => {
                          this.props.changeLocation(comments.commenterP_id);
                        }}
                      >
                        <img
                          className="comment-avatar_image"
                          width="25"
                          height="27.5"
                          src={`http://localhost:5000/uploads/avatars/${
                            comments.commenterAvatar
                          }`}
                          alt="avatar"
                        />
                        <h4 className="comment-name">
                          {comments.commenterName}
                        </h4>
                      </div>
                    </div>
                    <p className="comment-comment_content">
                      {comments.commenterComment}
                    </p>
                  </div>
                );
              })}

              {post._id !== this.props.currentPost ? (
                <div className="add-comment-button-container">
                  <i
                    className="fas fa-comment"
                    onClick={() => {
                      this.changeCurrentFocusedPost(post._id);
                    }}
                  >
                    <span className="open_and_close-comment">
                      &nbsp;Add Comment
                    </span>
                  </i>
                </div>
              ) : (
                <div>
                  <div className="add-comment-button-container">
                    <i
                      className="fas fa-comment"
                      onClick={() => {
                        this.changeCurrentFocusedPost("");
                      }}
                    >
                      <span className="open_and_close-comment">
                        &nbsp;Close Comment
                      </span>
                    </i>
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
