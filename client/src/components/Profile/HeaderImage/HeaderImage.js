import React, { Component } from "react";

import "./HeaderImage.css";
import Name from "./../Name/Name";
import AddFriend from "./../AddFriend/AddFriend.js";

import defaultHeaders from "./../../../utilities/defaultHeaders";

class HeaderImage extends Component {
  state = {
    headerClicked: false,
    newHeaderImage: ""
  };

  handleHeaderClick = () => {
    console.log("header has been clicked.");
    this.setState({ headerClicked: !this.state.headerClicked });
  };

  handleHeaderImageClick = e => {
    console.log("header image has been clicked");
    this.props.changeHeader(
      document.getElementById(e.target.id).getAttribute("value"),
      this.props.currentProfile
    );
    this.setState({ newHeaderImage: e.target.value, headerClicked: false });
  };

  render() {
    if (this.props.currentProfile === this.props.myProfile) {
      return this.state.headerClicked === true ? (
        <div className="HeaderImage-container" onClick={this.handleHeaderClick}>
          <img
            src={`http://localhost:5000/uploads/headers/${
              this.props.currentHeaderImage
            }`}
            alt="header"
          />
          <div>
            <div className="choosing-a-header">
              <h2 className="choosing-a-header-title">Choose a Header </h2>
              <div className="images-only">
                {Object.values(defaultHeaders).map(header => {
                  return (
                    <img
                      id={header}
                      height="200"
                      width="400"
                      src={`http://localhost:5000/uploads/headers/${header}`}
                      value={header}
                      onClick={this.handleHeaderImageClick}
                      alt={`header-${header}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <Name currentName={this.props.currentName} />
        </div>
      ) : (
        <div className="HeaderImage-container" onClick={this.handleHeaderClick}>
          <AddFriend
            isAFriend={this.props.isAFriend}
            addFriend={this.props.addFriend}
            currentProfile={this.props.currentProfile}
            getAndStoreFriendsPosts={this.props.getAndStoreFriendsPosts}
            myProfile={this.props.myProfile}
            deleteFriend={this.props.deleteFriend}
            addedFriend={this.props.addedFriend}
          />
          <img
            src={`http://localhost:5000/uploads/headers/${
              this.props.currentHeaderImage
            }`}
            alt="header"
          />
          <Name currentName={this.props.currentName} />
        </div>
      );
    } else {
      return (
        <div className="HeaderImage-container">
          <img
            src={`http://localhost:5000/uploads/headers/${
              this.props.currentHeaderImage
            }`}
            alt="header"
          />
          <AddFriend
            isAFriend={this.props.isAFriend}
            addFriend={this.props.addFriend}
            currentProfile={this.props.currentProfile}
            getAndStoreFriendsPosts={this.props.getAndStoreFriendsPosts}
            myProfile={this.props.myProfile}
            deleteFriend={this.props.deleteFriend}
            addedFriend={this.props.addedFriend}
          />
          <Name currentName={this.props.currentName} />
        </div>
      );
    }
  }
}

export default HeaderImage;
