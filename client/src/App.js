import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import "./App.css";

//Actions
import { authLogin, authSignUp, authCheck, authLogout } from "./actions/auth";
import {
  getAndStoreAllPosts,
  getAndStoreFriendsPosts,
  getAndStoreProfilePosts,
  createPost,
  createComment,
  changeCurrentFocusedPost
} from "./actions/posts";
import {
  getAndStoreAProfile,
  getAndStoreMyProfile,
  showFriends
} from "./actions/profile";

//Components
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/Private_Route/Private_Route";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import { USER_SIGNED_UP } from "./actions/types";

class App extends Component {
  componentDidMount = () => {
    console.log("App component mounted!");
    this.props.authCheck();
    if (window.location.pathname === "/") {
      return this.props.history.push("/login");
    }
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.authenticated !== this.props.authenticated &&
      this.props.authenticated !== false
    ) {
      console.log("App component did update!");
      this.props.getAndStoreAllPosts();
      this.props.getAndStoreFriendsPosts();
      //this.props.getAndStoreProfilePosts();
      this.props.getAndStoreMyProfile();
    }
    if (prevProps.currentProfile !== this.props.currentProfile) {
      console.log("App component is calling show friend!");
      this.props.showFriends(this.props.currentProfile);
      this.props.getAndStoreProfilePosts(this.props.currentProfile);
    }
    if (this.props.userSignedUp === 1) {
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      this.props.userHasSignedUp();
    }
  };

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    this.props.onLoginSubmit(this.state.email, this.state.password);
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

  changeLocation = profileId => {
    this.props.history.push(`/profile/${profileId}`);
    this.props.getAndStoreAProfile(profileId);
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Header
              getAndStoreMyProfile={this.props.getAndStoreMyProfile}
              getAndStoreAProfile={this.props.getAndStoreAProfile}
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
              getAndStoreAllPosts={this.props.getAndStoreAllPosts}
              getAndStoreFriendsPosts={this.props.getAndStoreFriendsPosts}
              allPosts={this.props.allPosts}
              friendsPosts={this.props.friendsPosts}
              createPost={this.props.createPost}
              createComment={this.props.createComment}
              changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
              currentPost={this.props.currentPost}
              getAndStoreAProfile={this.props.getAndStoreAProfile}
              currentProfile={this.props.currentProfile}
              currentProfileData={this.props.currentProfileData}
              changeLocation={this.changeLocation}
              {...props}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/profile/:profileId"
          component={props => (
            <Profile
              myProfile={this.props.myProfile}
              profilePosts={this.props.profilePosts}
              changeCurrentFocusedPost={this.props.changeCurrentFocusedPost}
              createComment={this.props.createComment}
              currentPost={this.props.currentPost}
              currentProfile={this.props.currentProfile}
              getAndStoreAProfile={this.props.getAndStoreAProfile}
              currentProfileData={this.props.currentProfileData}
              showFriends={this.props.showFriends}
              friendThumbnails={this.props.friendThumbnails}
              changeLocation={this.changeLocation}
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
              {...props}
            />
          )}
        />
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
  friendThumbnails: state.profileReducer.friendThumbnails
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
  createPost: postText => {
    dispatch(createPost(postText));
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
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(App))
);
