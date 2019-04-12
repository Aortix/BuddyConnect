import React, { Component } from "react";

class CreateComment extends Component {
  state = {
    commentText: ""
  };

  changeCommentText = e => {
    this.setState({ commentText: e.target.value });
  };

  submitCommentForm = e => {
    e.preventDefault();
    this.props.createComment(
      this.state.commentText,
      this.props.currentPost,
      this.props.currentProfile
    );
    this.props.changeCurrentFocusedPost("");
    this.setState({ commentText: "" });
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
          <br />
          <input
            type="submit"
            value="Submit"
            onClick={this.submitCommentForm}
          />
        </form>
      </div>
    );
  }
}

export default CreateComment;
