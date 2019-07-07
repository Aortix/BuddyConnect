import React, { Component } from "react";

import "./CreateComment.css";
import textareaExpand from "./../../utilities/textareaExpand";
import isEmpty from "./../../utilities/isEmpty";

class CreateComment extends Component {
  componentDidMount = () => {
    document.addEventListener(
      "input",
      event => {
        if (event.target.tagName.toLowerCase() !== "textarea") return;
        textareaExpand(event.target);
      },
      false
    );
  };

  componentWillUnmount = () => {
    document.removeEventListener(
      "input",
      event => {
        if (event.target.tagName.toLowerCase() !== "textarea") return;
        textareaExpand(event.target);
      },
      false
    );
  };

  state = {
    commentText: ""
  };

  changeCommentText = e => {
    this.setState({ commentText: e.target.value });
  };

  submitCommentForm = e => {
    e.preventDefault();
    if (this.props.currentProfile == null) {
      if (this.props.postIdsToHideComments.includes(this.props.postId) === true) {
        setTimeout(() => this.props.removePostIdToShowComments(this.props.postId), 1000);
      }
      this.props.createComment(
        this.state.commentText,
        this.props.currentPost,
        this.props.myProfile,
        this.props.allPosts.length,
        this.props.friendsPosts.length,
        this.props.profilePosts.length
      );
      this.setState({ commentText: "" });
    } else {
      if (this.props.postIdsToHideComments.includes(this.props.postId) === true) {
        setTimeout(() => this.props.removePostIdToShowComments(this.props.postId), 1000);
      }
      this.props.createComment(
        this.state.commentText,
        this.props.currentPost,
        this.props.currentProfile,
        this.props.allPosts.length,
        this.props.friendsPosts.length,
        this.props.profilePosts.length
      );
      this.setState({ commentText: "" });
    }
  };

  render() {
    return (
      <div className="CreateComment-container">
        <form>
          <textarea
            onChange={this.changeCommentText}
            value={this.state.commentText}
            placeholder="Create Comments Here..."
          />
          {isEmpty(this.props.commentErrors.comment) === true ? null : (
            <div className="CreateComment-errors">
              {this.props.commentErrors.comment}
            </div>
          )}
          {isEmpty(this.props.commentErrors.misc) === true ? null : (
            <div className="CreateComment-errors">
              {this.props.commentErrors.misc}
            </div>
          )}
          <button type="submit" value="Submit" onClick={this.submitCommentForm}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateComment;
