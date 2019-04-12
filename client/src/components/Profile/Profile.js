import React, { Component } from "react";

//components
import Song from "./Song/Song";
import HeaderImage from "./HeaderImage/HeaderImage";
import Avatar from "./Avatar/Avatar";
import Name from "./Name/Name";
import Post from "./../Post/Post";
import AboutMe from "./AboutMe/AboutMe";
import Friends from "./Friends/Friends";
import Interests from "./Interests/Interests";

class Profile extends Component {
  render() {
    if (this.props.currentProfileData === null) {
      return null;
    } else {
      return (
        <div className="Profile-container">
          <Song currentSong={this.props.currentProfileData.song} />
          <HeaderImage
            currentHeaderImage={this.props.currentProfileData.header}
          />
          <Avatar currentAvatar={this.props.currentProfileData.avatar} />
          <Name currentName={this.props.currentProfileData.name} />
          <Post
            posts={this.props.profilePosts}
            changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
            createComment={this.props.createComment}
            currentPost={this.props.currentPost}
            getAndStoreAProfile={this.props.getAndStoreAProfile}
            location={this.props.location}
            currentProfile={this.props.currentProfile}
            changeLocation={this.props.changeLocation}
          />
          <AboutMe currentAboutMe={this.props.currentProfileData.aboutMe} />
          <Friends
            friendThumbnails={this.props.friendThumbnails}
            showFriends={this.props.showFriends}
            currentFriends={this.props.currentProfileData.friends}
            currentProfile={this.props.currentProfile}
          />
          <Interests
            currentInterests={this.props.currentProfileData.interests}
          />
          <h1>Profile</h1>
        </div>
      );
    }
  }
}

export default Profile;
