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

export default class Profile extends Component {
  render() {
    return (
      <div className="Profile-container">
        <h1>Profile</h1>
        <Song />
        <HeaderImage />
        <Avatar />
        <Name />
        <AboutMe />
        <Friends />
        <Interests />
      </div>
    );
  }
}
