import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//Actions
import { authLogin, authSignUp, authCheck, authLogout } from "./actions/auth";
import {
  getAllPosts,
  changeAddComment,
  createPost,
  createComment,
  changePostId
} from "./actions/posts";

//Components
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/Private_Route/Private_Route";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";

class App extends Component {
  componentDidMount = () => {
    this.props.authCheck();
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.authenticated !== this.props.authenticated &&
      this.props.authenticated !== false
    ) {
      this.props.getAllPosts();
    }
  };

  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
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
      this.state.confirm_password
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            render={props => (
              <Header authLogout={this.props.authLogout} {...props} />
            )}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={props => (
              <Dashboard
                getAllPosts={this.props.getAllPosts}
                posts={this.props.posts}
                changeAddComment={this.props.changeAddComment}
                createPost={this.props.createPost}
                createComment={this.props.createComment}
                changePostId={this.props.changePostId}
                current_post={this.props.current_post}
                {...props}
              />
            )}
          />
          <PrivateRoute
            path="/profile/:profileId"
            component={props => <Profile {...props} />}
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
                confirm_password={this.state.confirm_password}
                authCheck={this.props.authCheck}
                authenticated={this.props.authenticated}
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
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  email: state.authReducer.email,
  authenticated: state.authReducer.authenticated,
  posts: state.postsReducer.global_posts,
  current_post: state.postsReducer.current_post
});

const mapDispatchToProps = dispatch => ({
  onSignUpSubmit: (name, email, password, confirm_password) => {
    dispatch(authSignUp(name, email, password, confirm_password));
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
  getAllPosts: () => {
    dispatch(getAllPosts());
  },
  changeAddComment: id => {
    dispatch(changeAddComment(id));
  },
  createPost: postText => {
    dispatch(createPost(postText));
  },
  createComment: (commentText, postId) => {
    dispatch(createComment(commentText, postId));
  },
  changePostId: postId => {
    dispatch(changePostId(postId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
