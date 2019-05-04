import React, { Component } from "react";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";

import "./Dashboard.css";

class Dashboard extends Component {
  componentDidMount = () => {
    window.localStorage.setItem("location", "/dashboard");
    console.log("When does this remount?");
    this.setState({ postsToSee: this.props.postsToSee });
  };

  state = {
    postsToSee: 0
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
                    this.updateToGlobalTab();
                  }}
                >
                  Global
                </button>
              </div>
            )}
            <CreatePost
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
          </div>
        </div>
        {this.props.postsToSee !== 1 ? (
          <div className="Dashboard-Post_component">
            <Post
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
            />
          </div>
        ) : (
          <div className="Dashboard-Post_component">
            <Post
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
            />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
