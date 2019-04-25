import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import PrivateRoute from "./../Private_Route/Private_Route.js";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div className="Dashboard-container">
          <div className="post-buttons-container">
            <Link to="/dashboard">
              <button
                id="posts-button"
                value="posts"
                onClick={() => {
                  document
                    .getElementById("global-button")
                    .classList.toggle("post-buttons");
                }}
              >
                Posts
              </button>
            </Link>
            <Link to="/dashboard/global">
              <button
                className="global-button-hidden"
                id="global-button"
                value="global"
                onClick={() => {
                  document
                    .getElementById("posts-button")
                    .classList.toggle("post-buttons-hidden");
                }}
              >
                Global
              </button>
            </Link>
          </div>
          <CreatePost
            createPost={this.props.createPost}
            currentProfile={this.props.currentProfile}
            createPostOnDifferentProfile={
              this.props.createPostOnDifferentProfile
            }
            postErrors={this.props.postErrors}
            clearPostErrors={this.props.clearPostErrors}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={props => (
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
                {...props}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/dashboard/global"
            component={props => (
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
                {...props}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
