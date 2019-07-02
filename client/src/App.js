import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
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
import {
  USER_SIGNED_UP,
  POST_DELETED,
  COMMENT_DELETED,
  CLEAR_ABOUT_ME_UPDATED,
  CLEAR_INTERESTS_UPDATED,
  CLEAR_NAME_CHANGED,
  CLEAR_EMAIL_CHANGED,
  CLEAR_PASSWORD_CHANGED,
  CLEAR_ACCOUNT_DELETED_CHANGED,
  UPDATE_POSTS_TO_SEE,
  CURRENT_TAB,
  CURRENT_COMPONENT,
  NEW_POSTS,
  ATTEMPTS
} from "./actions/types";
import { CLEAR_AUTH_ERRORS } from "./actions/types";
import { CLEAR_POST_ERRORS } from "./actions/types";
import { CLEAR_COMMENT_ERRORS } from "./actions/types";
import { CLEAR_PROFILE_ERRORS } from "./actions/types";
import { POST_CREATED } from "./actions/types";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import Settings from "./components/Settings/Settings";
import PageNotFound from "./components/PageNotFound/PageNotFound";

class App extends Component {
  componentDidMount = () => {
    //Check to see if the user is already logged in (checks through a JSON token in localstorage)
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
      this.props.getAndStoreAllPosts();
      this.props.getAndStoreFriendsPosts();
      setTimeout(() => {
        this.props.getNewPosts(1);
      }, 8000);

      if (
        /^\/profile\//.test(window.localStorage.getItem("location")) === true
      ) {
        let pastProfile = window.localStorage.getItem("location");
        this.props.getAndStoreMyProfile(pastProfile.replace("/profile/", ""));
        this.props.history.push(pastProfile);
      } else {
        this.props.getAndStoreMyProfile(null);
        this.props.history.push(window.localStorage.getItem("location"));
      }
    }

    if (
      prevProps.newPosts !== this.props.newPosts &&
      this.props.newPosts !== 1
    ) {
      setTimeout(() => {
        this.props.getNewPosts(1);
      }, 8000);
    }
    //This will grab the necessary friend information and profile posts for the current user
    if (prevProps.currentProfile !== this.props.currentProfile) {
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
    if (prevProps.userSignedUp !== this.props.userSignedUp) {
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        loginEmail: "",
        loginPassword: ""
      });
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
    loginPassword: "",
    signUpCaptcha: null,
    loginCaptcha: null
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    this.props.onLoginSubmit(
      this.state.loginEmail,
      this.state.loginPassword,
      this.state.loginCaptcha,
      this.props.attempts
    );
    this.setState({ loginCaptcha: null });
  };

  handleSignUpSubmit = event => {
    event.preventDefault();
    this.props.onSignUpSubmit(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.confirmPassword,
      this.state.signUpCaptcha
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  captchaSignUpChange = value => {
    this.setState({ signUpCaptcha: value });
  };

  captchaLoginChange = value => {
    this.setState({ loginCaptcha: value });
    setTimeout(() => {
      this.props.changeAttempts(0);
    }, 1500);
  };

  render() {
    return (
      <div className="App-with-footer">
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
          <Switch>
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
                  getAndStoreFriendsPosts={this.props.getAndStoreFriendsPosts}
                  getAndStoreAllPosts={this.props.getAndStoreAllPosts}
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
                  getAndStoreAProfile={this.props.getAndStoreAProfile}
                  postCreated={this.props.postCreated}
                  postAlreadyCreated={this.props.postAlreadyCreated}
                  postDeleted={this.props.postDeleted}
                  postAlreadyDeleted={this.props.postAlreadyDeleted}
                  commentDeleted={this.props.commentDeleted}
                  commentAlreadyDeleted={this.props.commentAlreadyDeleted}
                  postsToSee={this.props.postsToSee}
                  updatePostsToSee={this.props.updatePostsToSee}
                  newPosts={this.props.newPosts}
                  getNewPosts={this.props.getNewPosts}
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
                  postCreated={this.props.postCreated}
                  postAlreadyCreated={this.props.postAlreadyCreated}
                  postDeleted={this.props.postDeleted}
                  postAlreadyDeleted={this.props.postAlreadyDeleted}
                  commentDeleted={this.props.commentDeleted}
                  commentAlreadyDeleted={this.props.commentAlreadyDeleted}
                  location={props.location}
                  currentProfile={this.props.currentProfile}
                  aboutMeUpdated={this.props.aboutMeUpdated}
                  interestsUpdated={this.props.interestsUpdated}
                  clearAboutMeUpdated={this.props.clearAboutMeUpdated}
                  clearInterestsUpdated={this.props.clearInterestsUpdated}
                  addedFriend={this.props.addedFriend}
                  currentTab={this.props.currentTab}
                  updateCurrentTab={this.props.updateCurrentTab}
                  currentComponent={this.props.currentComponent}
                  updateCurrentComponent={this.props.updateCurrentComponent}
                  avatarUploading={this.props.avatarUploading}
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
                  currentProfile={this.props.currentProfile}
                  myProfile={this.props.myProfile}
                  nameChanged={this.props.nameChanged}
                  emailChanged={this.props.emailChanged}
                  passwordChanged={this.props.passwordChanged}
                  deleteAccountChanged={this.props.deleteAccountChanged}
                  clearNameChanged={this.props.clearNameChanged}
                  clearEmailChanged={this.props.clearEmailChanged}
                  clearPasswordChanged={this.props.clearPasswordChanged}
                  clearAccountDeletedChanged={
                    this.props.clearAccountDeletedChanged
                  }
                  authLogout={this.props.authLogout}
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
                  captchaSignUpChange={this.captchaSignUpChange}
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
                  userSignedUp={this.props.userSignedUp}
                  userHasSignedUp={this.props.userHasSignedUp}
                  captchaLoginChange={this.captchaLoginChange}
                  attempts={this.props.attempts}
                  {...props}
                />
              )}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
        <Route path="/" render={props => <Footer {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.authReducer.email,
  attempts: state.authReducer.attempts,
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
  settingsErrors: state.settingsReducer.settingsErrors,
  postCreated: state.postsReducer.postCreated,
  postDeleted: state.postsReducer.postDeleted,
  commentDeleted: state.postsReducer.commentDeleted,
  aboutMeUpdated: state.profileReducer.aboutMeUpdated,
  interestsUpdated: state.profileReducer.interestsUpdated,
  nameChanged: state.settingsReducer.nameChanged,
  emailChanged: state.settingsReducer.emailChanged,
  passwordChanged: state.settingsReducer.passwordChanged,
  deleteAccountChanged: state.settingsReducer.deleteAccountChanged,
  postsToSee: state.postsReducer.postsToSee,
  currentTab: state.profileReducer.currentTab,
  currentComponent: state.profileReducer.currentComponent,
  avatarUploading: state.profileReducer.avatarUploading,
  newPosts: state.postsReducer.newPosts
});

const mapDispatchToProps = dispatch => ({
  onSignUpSubmit: (name, email, password, confirmPassword, captcha) => {
    dispatch(authSignUp(name, email, password, confirmPassword, captcha));
  },
  onLoginSubmit: (email, password, captcha, attempts) => {
    dispatch(authLogin(email, password, captcha, attempts));
  },
  changeAttempts: number => {
    dispatch({ type: ATTEMPTS, payload: number });
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
  getAndStoreMyProfile: profileId => {
    dispatch(getAndStoreMyProfile(profileId));
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
  changeAvatar: (fileData, profileId) => {
    dispatch(changeAvatar(fileData, profileId));
  },
  changeHeader: (headerData, profileId) => {
    dispatch(changeHeader(headerData, profileId));
  },
  changeAboutMe: (aboutMeData, profileId) => {
    dispatch(changeAboutMe(aboutMeData, profileId));
  },
  changeInterests: (interestsData, profileId) => {
    dispatch(changeInterests(interestsData, profileId));
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
  },
  postAlreadyCreated: () => {
    dispatch({ type: POST_CREATED, payload: 0 });
  },
  postAlreadyDeleted: () => {
    dispatch({ type: POST_DELETED, payload: 0 });
  },
  commentAlreadyDeleted: () => {
    dispatch({ type: COMMENT_DELETED, payload: 0 });
  },
  clearAboutMeUpdated: () => {
    dispatch({ type: CLEAR_ABOUT_ME_UPDATED, payload: 0 });
  },
  clearInterestsUpdated: () => {
    dispatch({ type: CLEAR_INTERESTS_UPDATED, payload: 0 });
  },
  clearNameChanged: () => {
    dispatch({ type: CLEAR_NAME_CHANGED, payload: 0 });
  },
  clearEmailChanged: () => {
    dispatch({ type: CLEAR_EMAIL_CHANGED, payload: 0 });
  },
  clearPasswordChanged: () => {
    dispatch({ type: CLEAR_PASSWORD_CHANGED, payload: 0 });
  },
  clearAccountDeletedChanged: () => {
    dispatch({ type: CLEAR_ACCOUNT_DELETED_CHANGED, payload: 0 });
  },
  updatePostsToSee: posts => {
    dispatch({ type: UPDATE_POSTS_TO_SEE, payload: posts });
  },
  updateCurrentTab: tab => {
    dispatch({ type: CURRENT_TAB, payload: tab });
  },
  updateCurrentComponent: component => {
    dispatch({ type: CURRENT_COMPONENT, payload: component });
  },
  getNewPosts: number => {
    dispatch({ type: NEW_POSTS, payload: number });
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
