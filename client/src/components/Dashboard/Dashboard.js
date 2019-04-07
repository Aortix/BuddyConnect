import React, { Component } from "react";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";

class Dashboard extends Component {
  state = {
    location: "posts",
    postText: ""
  };

  componentDidUpdate = prevProps => {
    if (this.props.posts !== prevProps.posts) this.props.getAllPosts();
  };

  changeLocation = e => {
    this.setState({ location: e.target.value });
  };

  changePostText = e => {
    this.setState({ postText: e.target.value });
  };

  submitPostForm = e => {
    e.preventDefault();
    console.log(this.state.postText);
    this.setState({ postText: "" });
  };

  render() {
    return (
      <div>
        <button onClick={this.changeLocation} value="posts">
          Posts
        </button>
        <button onClick={this.changeLocation} value="global">
          Global
        </button>
        <CreatePost
          submitPostForm={this.submitPostForm}
          postText={this.state.postText}
          changePostText={this.changePostText}
        />
        <h2>Dashboard for authorized users.</h2>
        <h3>Posts Here:</h3>
        <Post
          posts={this.props.posts}
          location={this.state.location}
          submitPostForm={this.submitPostForm}
          postText={this.state.postText}
          changePostText={this.changePostText}
        />
      </div>
    );
  }
}

export default Dashboard;
