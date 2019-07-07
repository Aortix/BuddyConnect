import React, { Component } from "react";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";
import LoadMorePosts from "./../LoadMorePosts/LoadMorePosts";

import "./Dashboard.css";

class Dashboard extends Component {
  componentDidMount = () => {
    window.localStorage.setItem("location", "/dashboard");
    this.setState({ postsToSee: this.props.postsToSee });
  };

  state = {
    postsToSee: 0,
    receivingPosts: 0
  };

  updatePostsToPosts = number => {
    document.getElementById("global-button").classList.toggle("post-buttons");
    this.setState({ postsToSee: number });
    this.props.updatePostsToSee(number);
  };

  updatePostsToGlobal = number => {
    document
      .getElementById("posts-button")
      .classList.toggle("post-buttons-hidden");
    this.setState({ postsToSee: number });
    this.props.updatePostsToSee(number);
  };

  updateToGlobalTab = () => {
    document
      .getElementById("posts-button")
      .classList.toggle("post-buttons-hidden");
  };

  updateToPostsTab = () => {
    document.getElementById("global-button").classList.toggle("post-buttons");
  };

  render() {
    return (
      <div className="Dashboard-container">
        <div className="Dashboard-post_buttons_and_create_post">
          <div className="Dashboard-post_buttons_and_create_post-inner">
            {this.props.postsToSee !== 1 ? (
              <div className="post-buttons-container">
                <button
                  id="posts-button"
                  value="posts"
                  className="active"
                  onClick={() => {
                    this.updateToPostsTab();
                  }}
                >
                  Posts
                </button>
                <button
                  className="global-button-hidden"
                  id="global-button"
                  value="global"
                  onClick={() => {
                    this.updatePostsToGlobal(1);
                  }}
                >
                  Global
                </button>
              </div>
            ) : (
                <div className="post-buttons-container">
                  <button
                    className="global-button-hidden"
                    id="global-button"
                    value="posts"
                    onClick={() => {
                      this.updatePostsToGlobal(0);
                    }}
                  >
                    Posts
                </button>
                  <button
                    id="posts-button"
                    value="global"
                    className="active"
                    onClick={() => {
                      this.updateToPostsTab();
                    }}
                  >
                    Global
                </button>
                </div>
              )}
            <CreatePost
              allPosts={this.props.allPosts}
              friendsPosts={this.props.friendsPosts}
              profilePosts={this.props.profilePosts}
              createPost={this.props.createPost}
              currentProfile={this.props.currentProfile}
              createPostOnDifferentProfile={
                this.props.createPostOnDifferentProfile
              }
              postErrors={this.props.postErrors}
              clearPostErrors={this.props.clearPostErrors}
              postCreated={this.props.postCreated}
              postAlreadyCreated={this.props.postAlreadyCreated}
            />
            {this.props.newPosts === 1 ? (
              <div
                className="Dashboard-new_posts_button"
                onClick={() => {
                  this.props.getAndStoreAllPosts(this.props.allPosts.length);
                  this.props.getAndStoreFriendsPosts(
                    this.props.friendsPosts.length
                  );
                  this.props.getNewPosts(0);
                  window.scrollTo(0, 0);
                }}
              >
                <i className="fas fa-comments" />
                &nbsp;
                <span>Check For Posts</span>
              </div>
            ) : null}
          </div>
        </div>
        {this.props.postsToSee !== 1 ? (
          <div className="Dashboard-Post_component">
            <Post
              allPosts={this.props.allPosts}
              friendsPosts={this.props.friendsPosts}
              profilePosts={this.props.profilePosts}
              posts={this.props.friendsPosts}
              getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
              currentProfile={this.props.currentProfile}
              changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
              changeLocation={this.props.changeLocation}
              currentPost={this.props.currentPost}
              createComment={this.props.createComment}
              getAndStoreAProfile={this.props.getAndStoreAProfile}
              commentErrors={this.props.commentErrors}
              clearCommentErrors={this.props.clearCommentErrors}
              deletePost={this.props.deletePost}
              deleteComment={this.props.deleteComment}
              myProfile={this.props.myProfile}
              postDeleted={this.props.postDeleted}
              postAlreadyDeleted={this.props.postAlreadyDeleted}
              commentDeleted={this.props.commentDeleted}
              commentAlreadyDeleted={this.props.commentAlreadyDeleted}
              postIdsToHideComments={this.props.postIdsToHideComments}
              addPostIdToHideComments={this.props.addPostIdToHideComments}
              removePostIdToShowComments={this.props.removePostIdToShowComments}
            />
            {this.props.friendsPosts !== null &&
              this.props.friendsPosts.length === 0 ? null : (
                <LoadMorePosts
                  getAndStorePosts={this.props.getAndStoreFriendsPosts}
                  posts={this.props.friendsPosts}
                  receivingPosts={this.props.receivingPosts}
                  getReceivingPosts={this.props.getReceivingPosts}
                />
              )}
          </div>
        ) : (
            <div className="Dashboard-Post_component">
              <Post
                allPosts={this.props.allPosts}
                friendsPosts={this.props.friendsPosts}
                profilePosts={this.props.profilePosts}
                posts={this.props.allPosts}
                getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
                currentProfile={this.props.currentProfile}
                changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
                changeLocation={this.props.changeLocation}
                currentPost={this.props.currentPost}
                createComment={this.props.createComment}
                getAndStoreAProfile={this.props.getAndStoreAProfile}
                commentErrors={this.props.commentErrors}
                clearCommentErrors={this.props.clearCommentErrors}
                deletePost={this.props.deletePost}
                deleteComment={this.props.deleteComment}
                myProfile={this.props.myProfile}
                postDeleted={this.props.postDeleted}
                postAlreadyDeleted={this.props.postAlreadyDeleted}
                commentDeleted={this.props.commentDeleted}
                commentAlreadyDeleted={this.props.commentAlreadyDeleted}
                postIdsToHideComments={this.props.postIdsToHideComments}
                addPostIdToHideComments={this.props.addPostIdToHideComments}
                removePostIdToShowComments={this.props.removePostIdToShowComments}
              />
              {(this.props.allPosts !== null) &
                (this.props.allPosts.length === 0) ? null : (
                  <LoadMorePosts
                    getAndStorePosts={this.props.getAndStoreAllPosts}
                    posts={this.props.allPosts}
                    receivingPosts={this.props.receivingPosts}
                    getReceivingPosts={this.props.getReceivingPosts}
                  />
                )}
            </div>
          )}
      </div>
    );
  }
}

export default Dashboard;
