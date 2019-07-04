import React, { Component } from "react";

import isEmpty from "./../../utilities/isEmpty";
import "./CreatePost.css";

class CreatePost extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.postAlreadyCreated();
    }, 2500);
  };

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
        this.props.currentProfile,
        this.props.allPosts.length,
        this.props.friendsPosts.length,
        this.props.profilePosts.length
      );
      this.setState({ postText: "" });
    } else {
      this.props.createPost(
        this.state.postText,
        this.props.currentProfile,
        this.props.allPosts.length,
        this.props.friendsPosts.length,
        this.props.profilePosts.length
      );
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
              <div className="CreatePost-errors">
                {this.props.postErrors.post}
              </div>
            )}
            {isEmpty(this.props.postErrors.misc) === true ? null : (
              <div className="CreatePost-errors">
                {this.props.postErrors.misc}
              </div>
            )}
            {this.props.postCreated === 1 ? (
              <div className="CreatePost-successes">
                Post successfully created!
              </div>
            ) : null}
            <button
              className="CreatePost-submit_button"
              type="submit"
              onClick={this.submitPostForm}
            >
              <i className="fas fa-paper-plane" />
              <span style={{ color: "var(--main-text-color)" }}>
                &nbsp;Submit
              </span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
