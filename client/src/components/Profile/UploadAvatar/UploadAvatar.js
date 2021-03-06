import React, { Component } from "react";

import "./UploadAvatar.css";

import Avatar from "./../Avatar/Avatar";
export default class UploadAvatar extends Component {
  componentDidUpdate = (prevState, prevProps) => {
    if (
      prevState.fileUploaded !== this.state.fileUploaded &&
      this.state.fileUploaded !== 0
    ) {
      this.props.changeAvatar(
        this.state.file,
        this.props.currentProfile,
        this.props.allPosts.length,
        this.props.friendsPosts.length,
        this.props.profilePosts.length
      );
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

  render() {
    if (this.props.currentProfile === this.props.myProfile) {
      return this.props.avatarUploading !== 1 ? (
        <div className="UploadAvatar-container">
          <form encType="multipart/form-data">
            <label>
              <Avatar
                currentProfile={this.props.currentProfile}
                myProfile={this.props.myProfile}
                currentAvatar={this.props.currentAvatar}
              />
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
          {this.props.profileErrors.misc !== undefined ? (
            <p className="UploadAvatar-error">
              {this.props.profileErrors.misc}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="UploadAvatar-container UploadAvatar-loading">
          <Avatar
            currentProfile={this.props.currentProfile}
            myProfile={this.props.myProfile}
            currentAvatar="newstandard3.png"
          />
        </div>
      );
    } else {
      return (
        <div className="UploadAvatar-container">
          <Avatar
            currentProfile={this.props.currentProfile}
            myProfile={this.props.myProfile}
            currentAvatar={this.props.currentAvatar}
          />
        </div>
      );
    }
  }
}
