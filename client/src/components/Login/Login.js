import React, { Component } from "react";
import { Link } from "react-router-dom";

import isEmpty from "./../../utilities/isEmpty";
import "./Login.css";

class Login extends Component {
  componentDidMount = () => {
    if (this.props.authenticated === true) {
      this.props.history.push("/dashboard");
    }
    setTimeout(() => {
      this.props.userHasSignedUp();
    }, 3000);
  };

  componentDidUpdate = () => {
    if (this.props.authenticated === true) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div className="Login-container">
        <h1>Login</h1>
        <form onSubmit={this.props.handleLoginSubmit}>
          <p>Email:</p>
          <input
            type="email"
            name="loginEmail"
            onChange={this.props.handleChange}
            value={this.props.loginEmail}
          />
          {isEmpty(this.props.authErrors.email) === true ? null : (
            <div className="Login-errors">{this.props.authErrors.email}</div>
          )}
          <p>Password:</p>
          <input
            type="password"
            name="loginPassword"
            onChange={this.props.handleChange}
            value={this.props.loginPassword}
          />
          {isEmpty(this.props.authErrors.password) === true ? null : (
            <div className="Login-errors">{this.props.authErrors.password}</div>
          )}
          {this.props.userSignedUp === 1 ? (
            <div className="Login-successes">User successfully registered!</div>
          ) : null}
          <br />
          <input type="submit" name="Submit" value="GO" formNoValidate />
        </form>
        {isEmpty(this.props.authErrors.misc) === true ? null : (
          <div className="Login-errors">{this.props.authErrors.misc}</div>
        )}
        <Link to="/sign-up">
          <p>Need to create an account? Click here.</p>
        </Link>
      </div>
    );
  }
}

export default Login;
