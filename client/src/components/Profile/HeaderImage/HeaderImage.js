import React, { Component } from "react";

import "./HeaderImage.css";
import Name from "./../Name/Name";
import AddFriend from "./../AddFriend/AddFriend.js";

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
          <div className="choosing-a-header">
            <img
              id="alex-wong"
              height="200"
              width="200"
              src="http://localhost:5000/uploads/headers/alex-wong-17993-unsplash.jpg"
              value="alex-wong-17993-unsplash.jpg"
              onClick={this.handleHeaderImageClick}
              alt="image1"
            />
            <img
              id="andrew-ridley"
              height="200"
              width="200"
              src="http://localhost:5000/uploads/headers/andrew-ridley-76547-unsplash.jpg"
              value="andrew-ridley-76547-unsplash.jpg"
              onClick={this.handleHeaderImageClick}
              alt="image2"
            />
            <img
              id="steve-johnson"
              height="200"
              width="200"
              src="http://localhost:5000/uploads/headers/steve-johnson-771436-unsplash.jpg"
              value="steve-johnson-771436-unsplash.jpg"
              onClick={this.handleHeaderImageClick}
              alt="image3"
            />
            <img
              id="standard"
              height="200"
              width="200"
              src="http://localhost:5000/uploads/headers/standard.png"
              value="standard.png"
              onClick={this.handleHeaderImageClick}
              alt="image4"
            />
            <img
              id="kelly-sikkema"
              height="200"
              width="200"
              src="http://localhost:5000/uploads/headers/kelly-sikkema-450720-unsplash.jpg"
              value="kelly-sikkema-450720-unsplash.jpg"
              onClick={this.handleHeaderImageClick}
              alt="image5"
            />
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
          />
          <Name currentName={this.props.currentName} />
        </div>
      );
    }
  }
}

export default HeaderImage;
