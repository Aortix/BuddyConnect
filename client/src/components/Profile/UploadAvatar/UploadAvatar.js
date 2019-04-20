import React, { Component } from "react";

export default class UploadAvatar extends Component {
  state = {
    file: null
  };

  handleSubmitAvatar = e => {
    e.preventDefault();
    this.props.changeAvatar(this.state.file);
    //this.props.changeAvatar();
  };

  handleInput = e => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitAvatar} encType="multipart/form-data">
        <input
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={this.handleInput}
        />
        <input type="submit" name="Submit" />
      </form>
    );
  }
}
