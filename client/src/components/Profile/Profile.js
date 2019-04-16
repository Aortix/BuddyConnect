import React, { Component } from "react";

//components
import Song from "./Song/Song";
import AddFriend from "./AddFriend/AddFriend";
import HeaderImage from "./HeaderImage/HeaderImage";
import Avatar from "./Avatar/Avatar";
import Name from "./Name/Name";
import Post from "./../Post/Post";
import AboutMe from "./AboutMe/AboutMe";
import Friends from "./Friends/Friends";
import Interests from "./Interests/Interests";
import CreatePost from "./../CreatePost/CreatePost";

class Profile extends Component {
  componentDidMount = () => {
    console.log(this.props.isAFriend);
  };

  render() {
    if (this.props.currentProfileData === null) {
      return null;
    } else {
      return (
        <div className="Profile-container">
          <Song currentSong={this.props.currentProfileData.song} />
          <AddFriend
            isAFriend={this.props.isAFriend}
            addFriend={this.props.addFriend}
            currentProfile={this.props.currentProfile}
            getAndStoreFriendsPosts={this.props.getAndStoreFriendsPosts}
            myProfile={this.props.myProfile}
          />
          <HeaderImage
            currentHeaderImage={this.props.currentProfileData.header}
          />
          <Avatar currentAvatar={this.props.currentProfileData.avatar} />
          <Name currentName={this.props.currentProfileData.name} />
          <CreatePost
            createPost={this.props.createPost}
            currentProfile={this.props.currentProfile}
            createPostOnDifferentProfile={
              this.props.createPostOnDifferentProfile
            }
          />
          <Post
            posts={this.props.profilePosts}
            getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
            currentProfile={this.props.currentProfile}
            changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
            changeLocation={this.props.changeLocation}
            currentPost={this.props.currentPost}
            createComment={this.props.createComment}
            getAndStoreAProfile={this.props.getAndStoreAProfile}
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
        </div>
      );
    }
  }
}

export default Profile;
