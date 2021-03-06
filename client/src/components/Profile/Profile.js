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
import LoadMorePosts from "./../LoadMorePosts/LoadMorePosts";

class Profile extends Component {
  componentDidMount = () => {
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

  updateTabAndComponent = tab => {
    if (this.props.currentTab === 4) {
      this.props.updateCurrentTab(tab);
      this.props.updateCurrentComponent(tab);
    } else {
      this.props.updateCurrentTab(4);
      this.props.updateCurrentComponent(tab);
    }
  };

  render() {
    if (this.props.currentProfileData === null) {
      return null;
    } else {
      return (
        <div className="Profile-container">
          <HeaderImage
            friendsPosts={this.props.friendsPosts}
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
            allPosts={this.props.allPosts}
            friendsPosts={this.props.friendsPosts}
            profilePosts={this.props.profilePosts}
            currentProfile={this.props.currentProfile}
            myProfile={this.props.myProfile}
            currentAvatar={this.props.currentProfileData.avatar}
            changeAvatar={this.props.changeAvatar}
            profileErrors={this.props.profileErrors}
            clearProfileErrors={this.props.clearProfileErrors}
            getAndStoreMyProfile={this.props.getAndStoreMyProfile}
            avatarUploading={this.props.avatarUploading}
          />
          <CreatePost
            allPosts={this.props.allPosts}
            friendsPosts={this.props.friendsPosts}
            profilePosts={this.props.profilePosts}
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
                {this.props.currentTab === 0 ? (
                  <li
                    id="tab-0"
                    className="ppp"
                    onClick={() => this.updateTabAndComponent(0)}
                  >
                    Posts
                  </li>
                ) : null}
                {this.props.currentTab === 1 ? (
                  <li
                    id="tab-1"
                    className="ppp"
                    onClick={() => this.updateTabAndComponent(1)}
                  >
                    About Me
                  </li>
                ) : null}
                {this.props.currentTab === 2 ? (
                  <li
                    id="tab-2"
                    className="ppp"
                    onClick={() => this.updateTabAndComponent(2)}
                  >
                    Interests
                  </li>
                ) : null}
                {this.props.currentTab === 3 ? (
                  <li
                    id="tab-3"
                    className="ppp"
                    onClick={() => this.updateTabAndComponent(3)}
                  >
                    Buddies
                  </li>
                ) : null}
                {this.props.currentTab === 4 ? (
                  <React.Fragment>
                    <li
                      className="Profile-hidden_tab_perm"
                      onClick={() => this.updateTabAndComponent(0)}
                    >
                      Posts
                    </li>
                    <li
                      className="Profile-hidden_tab_perm"
                      onClick={() => this.updateTabAndComponent(1)}
                    >
                      About Me
                    </li>
                    <li
                      className="Profile-hidden_tab_perm"
                      onClick={() => this.updateTabAndComponent(2)}
                    >
                      Interests
                    </li>
                    <li
                      className="Profile-hidden_tab_perm"
                      onClick={() => this.updateTabAndComponent(3)}
                    >
                      Buddies
                    </li>
                  </React.Fragment>
                ) : null}
                {this.props.currentComponent === 0 ? (
                  <React.Fragment>
                    <li
                      className="Profile-active"
                      onClick={() => this.updateTabAndComponent(0)}
                    >
                      Posts
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(1)}
                    >
                      About Me
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(2)}
                    >
                      Interests
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(3)}
                    >
                      Buddies
                    </li>
                  </React.Fragment>
                ) : null}
                {this.props.currentComponent === 1 ? (
                  <React.Fragment>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(0)}
                    >
                      Posts
                    </li>
                    <li
                      className="Profile-active"
                      onClick={() => this.updateTabAndComponent(1)}
                    >
                      About Me
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(2)}
                    >
                      Interests
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(3)}
                    >
                      Buddies
                    </li>
                  </React.Fragment>
                ) : null}
                {this.props.currentComponent === 2 ? (
                  <React.Fragment>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(0)}
                    >
                      Posts
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(1)}
                    >
                      About Me
                    </li>
                    <li
                      className="Profile-active"
                      onClick={() => this.updateTabAndComponent(2)}
                    >
                      Interests
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(3)}
                    >
                      Buddies
                    </li>
                  </React.Fragment>
                ) : null}
                {this.props.currentComponent === 3 ? (
                  <React.Fragment>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(0)}
                    >
                      Posts
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(1)}
                    >
                      About Me
                    </li>
                    <li
                      className="Profile-not_active"
                      onClick={() => this.updateTabAndComponent(2)}
                    >
                      Interests
                    </li>
                    <li
                      className="Profile-active"
                      onClick={() => this.updateTabAndComponent(3)}
                    >
                      Buddies
                    </li>
                  </React.Fragment>
                ) : null}
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
              {this.props.currentComponent === 0 ? (
                <React.Fragment>
                  <Post
                    allPosts={this.props.allPosts}
                    friendsPosts={this.props.friendsPosts}
                    profilePosts={this.props.profilePosts}
                    posts={this.props.profilePosts}
                    getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
                    currentProfile={this.props.currentProfile}
                    changeCurrentFocusedPost={
                      this.props.changeCurrentFocusedPost
                    }
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
                    postIdsToHideComments={this.props.postIdsToHideComments}
                    addPostIdToHideComments={this.props.addPostIdToHideComments}
                    removePostIdToShowComments={this.props.removePostIdToShowComments}
                  />
                  {this.props.profilePosts !== null &&
                    this.props.profilePosts.length === 0 ? null : (
                      <LoadMorePosts
                        posts={this.props.profilePosts}
                        getAndStorePosts={this.props.getAndStoreProfilePosts}
                        currentProfile={this.props.currentProfile}
                        receivingPosts={this.props.receivingPosts}
                        getReceivingPosts={this.props.getReceivingPosts}
                      />
                    )}
                </React.Fragment>
              ) : null}

              {this.props.currentComponent === 1 ? (
                <AboutMe
                  currentAboutMe={this.props.currentProfileData.aboutMe}
                  changeAboutMe={this.props.changeAboutMe}
                  currentProfile={this.props.currentProfile}
                  myProfile={this.props.myProfile}
                />
              ) : null}

              {this.props.currentComponent === 2 ? (
                <Interests
                  currentInterests={this.props.currentProfileData.interests}
                  changeInterests={this.props.changeInterests}
                  currentProfile={this.props.currentProfile}
                  myProfile={this.props.myProfile}
                />
              ) : null}

              {this.props.currentComponent === 3 ? (
                <Friends
                  friendThumbnails={this.props.friendThumbnails}
                  showFriends={this.props.showFriends}
                  currentFriends={this.props.currentProfileData.friends}
                  currentProfile={this.props.currentProfile}
                  getAndStoreAProfile={this.props.getAndStoreAProfile}
                  history={this.props.history}
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
