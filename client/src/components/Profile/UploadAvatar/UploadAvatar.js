import React, { Component } from "react";

import "./UploadAvatar.css";

import Avatar from "./../Avatar/Avatar";
export default class UploadAvatar extends Component {
  componentDidUpdate = (prevState, prevProps) => {
    if (
      prevState.fileUploaded !== this.state.fileUploaded &&
      this.state.fileUploaded !== 0
    ) {
      this.props.changeAvatar(this.state.file, this.props.currentProfile);
    }
  };

  state = {
    file: null,
    fileUploaded: 0
  };

  handleInput = e => {
    this.setState({
      file: e.target.files[0],
      fileUploaded: this.state.fileUploaded + 1
    });
  };

  handleAvatarError = () => {
    //this.props.getAndStoreMyProfile(this.props.currentProfile);
  };

  render() {
    if (this.props.currentProfile === this.props.myProfile) {
      return (
        <div className="UploadAvatar-container">
          <form encType="multipart/form-data">
            <label>
              <Avatar currentAvatar={this.props.currentAvatar} />
              <input
                type="file"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={this.handleInput}
              />
            </label>
          </form>
          {this.props.profileErrors.avatar !== undefined ? (
            <p className="UploadAvatar-error">
              {this.props.profileErrors.avatar}
            </p>
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="UploadAvatar-container">
          <Avatar currentAvatar={this.props.currentAvatar} />
        </div>
      );
    }
  }
}
