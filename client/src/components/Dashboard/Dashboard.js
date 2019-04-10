import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrivateRoute from "./../Private_Route/Private_Route.js";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";

class Dashboard extends Component {
  state = {
    location: "posts",
    postText: "",
    commentText: ""
  };

  /*componentDidUpdate = prevProps => {
    if (this.props.globalPosts !== prevProps.globalPosts)
      console.log("Dashboard component did update for global posts!");
    this.props.getAllPosts();
    if (this.props.friendsPosts !== prevProps.friendsPosts)
      console.log("Dashboard component did update for friends posts!");
    this.props.getFriendsPosts();
  };*/

  changePage = pageId => {
    this.props.getProfile(pageId);
    this.props.history.push(`/profile/${pageId}`);
  };

  changePostId = postId => {
    this.props.changePostId(postId);
  };

  changeLocation = e => {
    this.props.history.push("/dashboard/" + e.target.value);
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
          <Link to="/dashboard/posts">
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
            path="/dashboard/posts"
            component={props => (
              <Post
                friendsPosts={this.props.friendsPosts}
                location={this.state.location}
                submitCommentForm={this.submitCommentForm}
                commentText={this.state.commentText}
                changeCommentText={this.changeCommentText}
                changeAddComment={this.props.changeAddComment}
                changePostId={this.changePostId}
                createComment={this.props.createComment}
                current_post={this.props.current_post}
                getProfile={this.props.getProfile}
                current_profile={this.props.current_profile}
                profile_data={this.props.profile_data}
                changePage={this.changePage}
                {...props}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/dashboard/global"
            component={props => (
              <Post
                globalPosts={this.props.globalPosts}
                location={this.state.location}
                submitCommentForm={this.submitCommentForm}
                commentText={this.state.commentText}
                changeCommentText={this.changeCommentText}
                changeAddComment={this.props.changeAddComment}
                changePostId={this.changePostId}
                createComment={this.props.createComment}
                current_post={this.props.current_post}
                getProfile={this.props.getProfile}
                current_profile={this.props.current_profile}
                profile_data={this.props.profile_data}
                changePage={this.changePage}
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
