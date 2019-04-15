import React, { Component } from "react";

class CreatePost extends Component {
  state = {
    postText: ""
  };

  changePostText = e => {
    this.setState({ postText: e.target.value });
  };

  submitPostForm = e => {
    e.preventDefault();
    this.props.createPost(this.state.postText, this.props.currentProfile);
    this.setState({ postText: "" });
  };
  render() {
    return (
      <div>
        <form>
          <textarea
            onChange={this.changePostText}
            value={this.state.postText}
            placeholder="Create Posts Here..."
          />
          <br />
          <input type="submit" value="Submit" onClick={this.submitPostForm} />
        </form>
      </div>
    );
  }
}

export default CreatePost;
