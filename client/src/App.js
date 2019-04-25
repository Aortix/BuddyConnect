import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import "./App.css";

//Actions
import { authLogin, authSignUp, authCheck, authLogout } from "./actions/auth";
import {
  getAndStoreAllPosts,
  getAndStoreFriendsPosts,
  getAndStoreProfilePosts,
  createPost,
  createPostOnDifferentProfile,
  createComment,
  changeCurrentFocusedPost,
  deletePost,
  deleteComment
} from "./actions/posts";
import {
  getAndStoreAProfile,
  getAndStoreMyProfile,
  showFriends,
  addFriend,
  checkForFriend,
  reverseAddedFriend,
  changeAvatar,
  changeHeader,
  changeAboutMe,
  changeInterests,
  deleteFriend
} from "./actions/profile";
import {
  changeName,
  changeEmail,
  changePassword,
  deleteAccount
} from "./actions/settings";

//Components
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/Private_Route/Private_Route";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import { USER_SIGNED_UP } from "./actions/types";
import { CLEAR_AUTH_ERRORS } from "./actions/types";
import { CLEAR_POST_ERRORS } from "./actions/types";
import { CLEAR_COMMENT_ERRORS } from "./actions/types";
import { CLEAR_PROFILE_ERRORS } from "./actions/types";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import Settings from "./components/Settings/Settings";

class App extends Component {
  componentDidMount = () => {
    //Check to see if the user is already logged in (checks through a JSON token in localstorage)
    console.log("App component mounted!");
    this.props.authCheck();

    //Makes sure that the user is redirected to the login page if they go to the standard "/"
    if (window.location.pathname === "/") {
      return this.props.history.push("/login");
    }
  };

  componentDidUpdate = prevProps => {
    //If the user does have a token in localstorage, this will grab all the posts along with their friends
    //posts from the database, while also getting their specific profile
    if (
      prevProps.authenticated !== this.props.authenticated &&
      this.props.authenticated !== false
    ) {
      console.log("App component updated!");
      this.props.getAndStoreAllPosts();
      this.props.getAndStoreFriendsPosts();
      this.props.getAndStoreMyProfile();
      this.props.history.push(window.localStorage.getItem("location"));
    }

    //This will grab the necessary friend information and profile posts for the current user
    if (prevProps.currentProfile !== this.props.currentProfile) {
      console.log("App component is getting friends and profile posts!");
      this.props.showFriends(this.props.currentProfile);
      this.props.getAndStoreProfilePosts(this.props.currentProfile);
      this.props.checkForFriend(this.props.currentProfile);
    }

    if (this.props.addedFriend === 1) {
      this.props.getAndStoreFriendsPosts();
      this.props.reverseAddedFriend();
    }

    //This is if the User signs up, logs in, and then logs out within the same session; the information that was
    //inputed in the signup/login field before will now be blank instead of being filled with the previous information.
    if (this.props.userSignedUp === 1) {
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        loginEmail: "",
        loginPassword: ""
      });

      //resets userSignedUp back to 0
      this.props.userHasSignedUp();
    }

    if (this.props.location !== prevProps.location) {
      this.props.clearAuthErrors();
      this.props.clearPostErrors();
      this.props.clearCommentErrors();
      this.props.clearProfileErrors();
    }
  };

  //Function for when a user clicks on a post or comment username, and thus will be redirected to
  //that user's profile
  changeLocation = profileId => {
    this.props.history.push(`/profile/${profileId}`);
    this.props.getAndStoreAProfile(profileId);
  };

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginEmail: "",
    loginPassword: ""
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    this.props.onLoginSubmit(this.state.loginEmail, this.state.loginPassword);
  };

  handleSignUpSubmit = event => {
    event.preventDefault();
    this.props.onSignUpSubmit(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.confirmPassword
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Header
              myProfile={this.props.myProfile}
              authLogout={this.props.authLogout}
              changeLocation={this.changeLocation}
              authenticated={this.props.authenticated}
              {...props}
            />
          )}
        />
        <Route
          path="/"
          render={props => (
            <SideBar
              authenticated={this.props.authenticated}
              myProfile={this.props.myProfile}
              authLogout={this.props.authLogout}
              changeLocation={this.changeLocation}
              {...props}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          component={props => (
            <Dashboard
              createPost={this.props.createPost}
              currentProfile={this.props.currentProfile}
              friendsPosts={this.props.friendsPosts}
              allPosts={this.props.allPosts}
              getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
              changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
              changeLocation={this.changeLocation}
              currentPost={this.props.currentPost}
              createComment={this.props.createComment}
              createPostOnDifferentProfile={
                this.props.createPostOnDifferentProfile
              }
              postErrors={this.props.postErrors}
              commentErrors={this.props.commentErrors}
              clearPostErrors={this.props.clearPostErrors}
              clearCommentErrors={this.props.clearCommentErrors}
              deletePost={this.props.deletePost}
              deleteComment={this.props.deleteComment}
              myProfile={this.props.myProfile}
              {...props}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/profile/:profileId"
          component={props => (
            <Profile
              profilePosts={this.props.profilePosts}
              getAndStoreProfilePosts={this.props.getAndStoreProfilePosts}
              currentProfile={this.props.currentProfile}
              currentProfileData={this.props.currentProfileData}
              createPost={this.props.createPost}
              friendThumbnails={this.props.friendThumbnails}
              showFriends={this.props.showFriends}
              changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
              changeLocation={this.changeLocation}
              getAndStoreAProfile={this.props.getAndStoreAProfile}
              currentPost={this.props.currentPost}
              createComment={this.props.createComment}
              isAFriend={this.props.isAFriend}
              checkForFriend={this.props.checkForFriend}
              addFriend={this.props.addFriend}
              getAndStoreFriendsPosts={this.props.getAndStoreFriendsPosts}
              myProfile={this.props.myProfile}
              createPostOnDifferentProfile={
                this.props.createPostOnDifferentProfile
              }
              changeAvatar={this.props.changeAvatar}
              changeHeader={this.props.changeHeader}
              changeAboutMe={this.props.changeAboutMe}
              changeInterests={this.props.changeInterests}
              postErrors={this.props.postErrors}
              commentErrors={this.props.commentErrors}
              clearPostErrors={this.props.clearPostErrors}
              clearCommentErrors={this.props.clearCommentErrors}
              deletePost={this.props.deletePost}
              deleteComment={this.props.deleteComment}
              deleteFriend={this.props.deleteFriend}
              profileErrors={this.props.profileErrors}
              clearProfileErrors={this.props.clearProfileErrors}
              getAndStoreMyProfile={this.props.getAndStoreMyProfile}
              {...props}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/settings"
          component={props => (
            <Settings
              changeName={this.props.changeName}
              changeEmail={this.props.changeEmail}
              changePassword={this.props.changePassword}
              deleteAccount={this.props.deleteAccount}
              settingsErrors={this.props.settingsErrors}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/sign-up"
          render={props => (
            <SignUp
              handleSignUpSubmit={this.handleSignUpSubmit}
              handleChange={this.handleChange}
              name={this.state.name}
              email={this.state.email}
              password={this.state.password}
              confirmPassword={this.state.confirmPassword}
              authCheck={this.props.authCheck}
              authenticated={this.props.authenticated}
              userSignedUp={this.props.userSignedUp}
              authErrors={this.props.authErrors}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login
              handleLoginSubmit={this.handleLoginSubmit}
              handleChange={this.handleChange}
              email={this.state.email}
              password={this.state.password}
              authCheck={this.props.authCheck}
              authenticated={this.props.authenticated}
              authErrors={this.props.authErrors}
              {...props}
            />
          )}
        />
        <Route path="/" render={props => <Footer {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.authReducer.email,
  authenticated: state.authReducer.authenticated,
  userSignedUp: state.authReducer.userSignedUp,
  allPosts: state.postsReducer.allPosts,
  friendsPosts: state.postsReducer.friendsPosts,
  profilePosts: state.postsReducer.profilePosts,
  currentPost: state.postsReducer.currentPost,
  currentProfile: state.profileReducer.currentProfile,
  myProfile: state.profileReducer.myProfile,
  currentProfileData: state.profileReducer.currentProfileData,
  friendThumbnails: state.profileReducer.friendThumbnails,
  isAFriend: state.profileReducer.isAFriend,
  addedFriend: state.profileReducer.addedFriend,
  authErrors: state.authReducer.errors,
  postErrors: state.postsReducer.postErrors,
  commentErrors: state.postsReducer.commentErrors,
  profileErrors: state.profileReducer.profileErrors,
  settingsErrors: state.settingsReducer.settingsErrors
});

const mapDispatchToProps = dispatch => ({
  onSignUpSubmit: (name, email, password, confirmPassword) => {
    dispatch(authSignUp(name, email, password, confirmPassword));
  },
  onLoginSubmit: (email, password) => {
    dispatch(authLogin(email, password));
  },
  authCheck: () => {
    dispatch(authCheck());
  },
  authLogout: () => {
    dispatch(authLogout());
  },
  getAndStoreAllPosts: () => {
    dispatch(getAndStoreAllPosts());
  },
  getAndStoreFriendsPosts: () => {
    dispatch(getAndStoreFriendsPosts());
  },
  getAndStoreProfilePosts: profileId => {
    dispatch(getAndStoreProfilePosts(profileId));
  },
  createPost: (postText, profileId) => {
    dispatch(createPost(postText, profileId));
  },
  createPostOnDifferentProfile: (postText, profileId) => {
    dispatch(createPostOnDifferentProfile(postText, profileId));
  },
  createComment: (commentText, postId, profileId) => {
    dispatch(createComment(commentText, postId, profileId));
  },
  changeCurrentFocusedPost: postId => {
    dispatch(changeCurrentFocusedPost(postId));
  },
  getAndStoreAProfile: profileId => {
    dispatch(getAndStoreAProfile(profileId));
  },
  getAndStoreMyProfile: () => {
    dispatch(getAndStoreMyProfile());
  },
  showFriends: profileId => {
    dispatch(showFriends(profileId));
  },
  userHasSignedUp: () => {
    dispatch({ type: USER_SIGNED_UP, payload: 0 });
  },
  addFriend: profileId => {
    dispatch(addFriend(profileId));
  },
  checkForFriend: profileId => {
    dispatch(checkForFriend(profileId));
  },
  reverseAddedFriend: () => {
    dispatch(reverseAddedFriend());
  },
  changeName: name => {
    dispatch(changeName(name));
  },
  changeEmail: (email, password2) => {
    dispatch(changeEmail(email, password2));
  },
  changePassword: (password, password2) => {
    dispatch(changePassword(password, password2));
  },
  changeAvatar: fileData => {
    dispatch(changeAvatar(fileData));
  },
  changeHeader: headerData => {
    dispatch(changeHeader(headerData));
  },
  changeAboutMe: aboutMeData => {
    dispatch(changeAboutMe(aboutMeData));
  },
  changeInterests: interestsData => {
    dispatch(changeInterests(interestsData));
  },
  deleteAccount: password2 => {
    dispatch(deleteAccount(password2));
  },
  clearAuthErrors: () => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
  },
  clearPostErrors: () => {
    dispatch({ type: CLEAR_POST_ERRORS });
  },
  clearCommentErrors: () => {
    dispatch({ type: CLEAR_COMMENT_ERRORS });
  },
  clearProfileErrors: () => {
    dispatch({ type: CLEAR_PROFILE_ERRORS });
  },
  deletePost: (postId, currentProfile) => {
    dispatch(deletePost(postId, currentProfile));
  },
  deleteComment: (commentId, postId, currentProfile) => {
    dispatch(deleteComment(commentId, postId, currentProfile));
  },
  deleteFriend: friendId => {
    dispatch(deleteFriend(friendId));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
