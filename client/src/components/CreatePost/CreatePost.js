import React, { Component } from "react";

import isEmpty from "./../../utilities/isEmpty";
import "./CreatePost.css";

class CreatePost extends Component {
  state = {
    postText: ""
  };

  changePostText = e => {
    this.setState({ postText: e.target.value });
  };

  submitPostForm = e => {
    const regex = /profile\/\w+/;
    e.preventDefault();
    if (regex.test(window.location.pathname) === true) {
      this.props.createPostOnDifferentProfile(
        this.state.postText,
        this.props.currentProfile
      );
      this.setState({ postText: "" });
    } else {
      this.props.createPost(this.state.postText, this.props.currentProfile);
      this.setState({ postText: "" });
    }
  };
  render() {
    return (
      <div className="CreatePost-container">
        <form>
          <div className="create-post-form">
            <textarea
              onChange={this.changePostText}
              value={this.state.postText}
              placeholder="What's on your mind today?"
            />
            <br />
            {isEmpty(this.props.postErrors.post) === true ? null : (
              <p>{this.props.postErrors.post}</p>
            )}
            {isEmpty(this.props.postErrors.misc) === true ? null : (
              <p>{this.props.postErrors.misc}</p>
            )}
            <input type="submit" value="Submit" onClick={this.submitPostForm} />
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
