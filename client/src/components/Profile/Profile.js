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
    setTimeout(() => {
      this.props.clearAboutMeUpdated();
      this.props.clearInterestsUpdated();
    }, 4000);
    window.localStorage.setItem(
      "location",
      `/profile/${this.props.currentProfile}`
    );
    if (
      this.props.location.pathname.replace("/profile/", "") !==
      this.props.currentProfile
    ) {
      this.props.getAndStoreAProfile(
        this.props.location.pathname.replace("/profile/", "")
      );
    }
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
            profileErrors={this.props.profileErrors}
            addedFriend={this.props.addedFriend}
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
            postCreated={this.props.postCreated}
            postAlreadyCreated={this.props.postAlreadyCreated}
          />
          <div className="Profile-desktop_flex">
            <div className="Profile-tabs_desktop">
              <ul className="profile-tabs-container">
                <li
                  className="profile-individual-tabs visibility profile-desktop"
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
                        .classList.contains("component-shown-until-hidden") ===
                      true
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
                  className="profile-individual-tabs profile-desktop"
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
                        .classList.contains("component-shown-until-hidden") ===
                      true
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
                  className="profile-individual-tabs profile-desktop"
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
                        .classList.contains("component-shown-until-hidden") ===
                      true
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
                  className="profile-individual-tabs profile-desktop"
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
                        .classList.contains("component-shown-until-hidden") ===
                      true
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
            </div>
            <div className="Profile-tab_information_desktop">
              {this.props.aboutMeUpdated === 1 ? (
                <div className="Profile-successes">About me updated!</div>
              ) : null}
              {this.props.interestsUpdated === 1 ? (
                <div className="Profile-successes">Interests updated!</div>
              ) : null}
              {this.props.profileErrors.aboutMe !== undefined ? (
                <div className="Profile-errors">
                  {this.props.profileErrors.aboutMe}
                </div>
              ) : null}
              {this.props.profileErrors.interests !== undefined ? (
                <div className="Profile-errors">
                  {this.props.profileErrors.interests}
                </div>
              ) : null}
              {this.props.profileErrors.misc !== undefined ? (
                <div className="Profile-errors">
                  {this.props.profileErrors.misc}
                </div>
              ) : null}
              <Post
                id={`Post-component`}
                className={`component-shown-until-hidden`}
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
                postDeleted={this.props.postDeleted}
                postAlreadyDeleted={this.props.postAlreadyDeleted}
                commentDeleted={this.props.commentDeleted}
                commentAlreadyDeleted={this.props.commentAlreadyDeleted}
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
          </div>
        </div>
      );
    }
  }
}

export default Profile;
