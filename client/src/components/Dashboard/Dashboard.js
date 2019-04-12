import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import PrivateRoute from "./../Private_Route/Private_Route.js";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";

class Dashboard extends Component {
  state = {
    postText: "",
    commentText: ""
  };

  changePostText = e => {
    this.setState({ postText: e.target.value });
  };

  submitPostForm = e => {
    e.preventDefault();
    this.props.createPost(this.state.postText);
    this.setState({ postText: "", commentText: "" });
  };

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
            submitPostForm={this.submitPostForm}
            postText={this.state.postText}
            changePostText={this.changePostText}
          />
          <h2>Dashboard for authorized users.</h2>
          <h3>Posts Here:</h3>
          <PrivateRoute
            exact
            path="/dashboard"
            component={props => (
              <Post
                posts={this.props.friendsPosts}
                changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
                createComment={this.props.createComment}
                currentPost={this.props.currentPost}
                getAndStoreAProfile={this.props.getAndStoreAProfile}
                location={this.props.location}
                changeLocation={this.props.changeLocation}
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
                changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
                createComment={this.props.createComment}
                currentPost={this.props.currentPost}
                getAndStoreAProfile={this.props.getAndStoreAProfile}
                location={this.props.location}
                changeLocation={this.props.changeLocation}
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
