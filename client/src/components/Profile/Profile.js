import React, { Component } from "react";

import "./Profile.css";

//components
import HeaderImage from "./HeaderImage/HeaderImage";
import UploadAvatar from "./UploadAvatar/UploadAvatar";
import Post from "./../Post/Post";
import AboutMe from "./AboutMe/AboutMe";
import Friends from "./Friends/Friends";
import Interests from "./Interests/Interests";
import CreatePost from "./../CreatePost/CreatePost";

class Profile extends Component {
  componentDidMount = () => {
    console.log(this.props.isAFriend);
    window.localStorage.setItem(
      "location",
      `/profile/${this.props.currentProfile}`
    );
  };

  componentWillUnmount = () => {
    window.localStorage.setItem("location", "/dashboard");
  };

  render() {
    if (this.props.currentProfileData === null) {
      return null;
    } else {
      return (
        <div className="Profile-container">
          <HeaderImage
            currentHeaderImage={this.props.currentProfileData.header}
            changeHeader={this.props.changeHeader}
            currentName={this.props.currentProfileData.name}
            currentProfile={this.props.currentProfile}
            myProfile={this.props.myProfile}
            isAFriend={this.props.isAFriend}
            addFriend={this.props.addFriend}
            getAndStoreFriendsPosts={this.props.getAndStoreFriendsPosts}
            deleteFriend={this.props.deleteFriend}
          />
          <UploadAvatar
            currentProfile={this.props.currentProfile}
            myProfile={this.props.myProfile}
            currentAvatar={this.props.currentProfileData.avatar}
            changeAvatar={this.props.changeAvatar}
            profileErrors={this.props.profileErrors}
            clearProfileErrors={this.props.clearProfileErrors}
            getAndStoreMyProfile={this.props.getAndStoreMyProfile}
          />
          <CreatePost
            createPost={this.props.createPost}
            currentProfile={this.props.currentProfile}
            createPostOnDifferentProfile={
              this.props.createPostOnDifferentProfile
            }
            postErrors={this.props.postErrors}
            clearPostErrors={this.props.clearPostErrors}
          />
          <ul className="profile-tabs-container">
            <li
              className="profile-individual-tabs visibility"
              id="posts-tab"
              onClick={() => {
                let tabs = Array.from(
                  document.getElementsByClassName("profile-individual-tabs")
                );
                tabs.forEach(tab => {
                  tab.classList.toggle("show-profile-tabs");
                });
                document
                  .getElementById("posts-tab")
                  .classList.toggle("visibility");
                if (
                  document
                    .getElementById("Post-component")
                    .classList.contains("component-shown-until-hidden") === true
                ) {
                } else {
                  document
                    .getElementById("Post-component")
                    .classList.add("component-shown-until-hidden");
                  document
                    .getElementById("AboutMe-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("Interests-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("Friends-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                }
              }}
            >
              Posts
            </li>
            <li
              className="profile-individual-tabs"
              id="about-me-tab"
              onClick={() => {
                let tabs = Array.from(
                  document.getElementsByClassName("profile-individual-tabs")
                );
                tabs.forEach(tab => {
                  tab.classList.toggle("show-profile-tabs");
                });
                document
                  .getElementById("about-me-tab")
                  .classList.toggle("visibility");
                if (
                  document
                    .getElementById("AboutMe-component")
                    .classList.contains("component-shown-until-hidden") === true
                ) {
                } else {
                  document
                    .getElementById("AboutMe-component")
                    .classList.add("component-shown-until-hidden");
                  document
                    .getElementById("Post-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("Interests-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("Friends-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                }
              }}
            >
              About Me
            </li>
            <li
              className="profile-individual-tabs"
              id="interests-tab"
              onClick={() => {
                let tabs = Array.from(
                  document.getElementsByClassName("profile-individual-tabs")
                );
                tabs.forEach(tab => {
                  tab.classList.toggle("show-profile-tabs");
                });
                document
                  .getElementById("interests-tab")
                  .classList.toggle("visibility");
                if (
                  document
                    .getElementById("Interests-component")
                    .classList.contains("component-shown-until-hidden") === true
                ) {
                } else {
                  document
                    .getElementById("Interests-component")
                    .classList.add("component-shown-until-hidden");
                  document
                    .getElementById("Post-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("AboutMe-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("Friends-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                }
              }}
            >
              Interests
            </li>
            <li
              className="profile-individual-tabs"
              id="friends-tab"
              onClick={() => {
                let tabs = Array.from(
                  document.getElementsByClassName("profile-individual-tabs")
                );
                tabs.forEach(tab => {
                  tab.classList.toggle("show-profile-tabs");
                });
                document
                  .getElementById("friends-tab")
                  .classList.toggle("visibility");
                if (
                  document
                    .getElementById("Friends-component")
                    .classList.contains("component-shown-until-hidden") === true
                ) {
                } else {
                  document
                    .getElementById("Friends-component")
                    .classList.add("component-shown-until-hidden");
                  document
                    .getElementById("Post-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("Interests-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                  document
                    .getElementById("AboutMe-component")
                    .classList.replace(
                      "component-shown-until-hidden",
                      "component-hidden-until-shown"
                    );
                }
              }}
            >
              Friends
            </li>
          </ul>
          <Post
            id={`Post-component`}
            posts={this.props.profilePosts}
            getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
            currentProfile={this.props.currentProfile}
            changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
            changeLocation={this.props.changeLocation}
            currentPost={this.props.currentPost}
            createComment={this.props.createComment}
            getAndStoreAProfile={this.props.getAndStoreAProfile}
            commentErrors={this.props.commentErrors}
            clearCommentErrors={this.props.clearCommentErrors}
            deletePost={this.props.deletePost}
            deleteComment={this.props.deleteComment}
            myProfile={this.props.myProfile}
          />
          <AboutMe
            className={`component-hidden-until-shown`}
            id={`AboutMe-component`}
            currentAboutMe={this.props.currentProfileData.aboutMe}
            changeAboutMe={this.props.changeAboutMe}
            currentProfile={this.props.currentProfile}
            myProfile={this.props.myProfile}
          />
          <Interests
            className={`component-hidden-until-shown`}
            id={`Interests-component`}
            currentInterests={this.props.currentProfileData.interests}
            changeInterests={this.props.changeInterests}
            currentProfile={this.props.currentProfile}
            myProfile={this.props.myProfile}
          />
          <Friends
            className={`component-hidden-until-shown`}
            id={`Friends-component`}
            friendThumbnails={this.props.friendThumbnails}
            showFriends={this.props.showFriends}
            currentFriends={this.props.currentProfileData.friends}
            currentProfile={this.props.currentProfile}
            getAndStoreAProfile={this.props.getAndStoreAProfile}
            history={this.props.history}
          />
        </div>
      );
    }
  }
}

export default Profile;
