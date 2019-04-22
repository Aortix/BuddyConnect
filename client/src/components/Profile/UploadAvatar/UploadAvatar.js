import React, { Component } from "react";

import "./UploadAvatar.css";

import Avatar from "./../Avatar/Avatar";
export default class UploadAvatar extends Component {
  componentDidUpdate = (prevState) => {
    if (prevState.fileUploaded !== this.state.fileUploaded) {
      console.log('File updated.');
      this.props.changeAvatar(this.state.file);
    }
  }
  state = {
    file: null,
    fileUploaded: 0
  };

  handleInput = e => {
    this.setState({ file: e.target.files[0], fileUploaded: this.state.fileUploaded + 1});
  };

  render() {
    if (this.props.currentProfile === this.props.myProfile) {
    return (
      <form className="UploadAvatar-container" onSubmit={this.handleSubmitAvatar} encType="multipart/form-data">
        <label><Avatar currentAvatar={this.props.currentAvatar} />
        <input
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={this.handleInput}
        />
        </label>
      </form>
    )} else {
      return (
      <div className="UploadAvatar-container">
        <Avatar currentAvatar={this.props.currentAvatar} />
      </div> 
      )
    };
  }
}
