import React, { Component } from "react";
import Post from "./../Post/Post";
import CreatePost from "./../CreatePost/CreatePost";

class Dashboard extends Component {
  state = {
    location: "posts",
    postText: "",
    commentText: ""
  };

  componentDidUpdate = prevProps => {
    if (this.props.posts !== prevProps.posts) this.props.getAllPosts();
  };

  changePostId = postId => {
    this.props.changePostId(postId);
  };

  changeLocation = e => {
    this.setState({ location: e.target.value });
  };

  changePostText = e => {
    this.setState({ postText: e.target.value });
  };

  changeCommentText = e => {
    this.setState({ commentText: e.target.value });
  };

  submitPostForm = e => {
    e.preventDefault();
    this.props.createPost(this.state.postText);
    this.setState({ postText: "", commentText: "" });
  };

  submitCommentForm = e => {
    e.preventDefault();
    this.props.createComment(this.state.commentText, this.props.current_post);
    this.setState({ postText: "", commentText: "" });
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
          submitCommentForm={this.submitCommentForm}
          commentText={this.state.commentText}
          changeCommentText={this.changeCommentText}
          changeAddComment={this.props.changeAddComment}
          changePostId={this.changePostId}
        />
      </div>
    );
  }
}

export default Dashboard;
