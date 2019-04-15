import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import PrivateRoute from "./../Private_Route/Private_Route.js";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";

class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/dashboard">
            <button value="posts">Posts</button>
          </Link>
          <Link to="/dashboard/global">
            <button value="global">Global</button>
          </Link>
          <CreatePost
            createPost={this.props.createPost}
            currentProfile={this.props.currentProfile}
          />
          <h2>Dashboard for authorized users.</h2>
          <h3>Posts Here:</h3>
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
