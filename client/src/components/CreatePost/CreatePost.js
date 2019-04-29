import React, { Component } from "react";

import isEmpty from "./../../utilities/isEmpty";
import postTitles from "./../../utilities/postTitles";
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
      <h2 className="CreatePost-title">Anything to share today?</h2>
        <form>
          <div className="create-post-form">
            <textarea
              onChange={this.changePostText}
              value={this.state.postText}
              placeholder="Talk about it here..."
            />
            <br />
            {isEmpty(this.props.postErrors.post) === true ? null : (
              <p>{this.props.postErrors.post}</p>
            )}
            {isEmpty(this.props.postErrors.misc) === true ? null : (
              <p>{this.props.postErrors.misc}</p>
            )}
            <button className="CreatePost-submit_button" type="submit" onClick={this.submitPostForm}><i className="fas fa-paper-plane"></i><span>&nbsp;Submit</span></button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
