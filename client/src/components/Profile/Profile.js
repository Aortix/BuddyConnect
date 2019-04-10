import React, { Component } from "react";

//components
import Song from "./Song/Song";
import AboutMe from "./AboutMe/AboutMe";
import Friends from "./Friends/Friends";
import HeaderImage from "./HeaderImage/HeaderImage";
import Interests from "./Interests/Interests";
import Post from "./../Post/Post";
import Avatar from "./../Avatar/Avatar";
import Name from "./Name/Name";

class Profile extends Component {
  componentDidUpdate = prevProps => {
    if (this.props.current_profile !== this.props.match.params.profileId) {
      console.log("Profile component updated.");
    }
  };

  render() {
    return (
      <div className="Profile-container">
        <p>{this.props.current_profile}</p>
        <h1>Profile</h1>
      </div>
    );
  }
}

export default Profile;
