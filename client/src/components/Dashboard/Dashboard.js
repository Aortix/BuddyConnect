import React, { Component } from "react";
import Post from "./../Post/Post";

class Dashboard extends Component {
  componentDidUpdate = prevProps => {
    if (this.props.posts !== prevProps.posts) this.props.getAllPosts();
  };

  render() {
    return (
      <div>
        <h2>Dashboard for authorized users.</h2>
        <h3>Posts Here:</h3>
        <Post posts={this.props.posts} />
      </div>
    );
  }
}

export default Dashboard;
