import React, { Component } from "react";
import { Link } from "react-router-dom";

import isEmpty from "./../../utilities/isEmpty";
import "./SignUp.css";

import ReCaptcha from "react-google-recaptcha";

class SignUp extends Component {
  componentDidMount = () => {
    if (this.props.authenticated === true) {
      this.props.history.push("/dashboard");
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.authenticated === true) {
      this.props.history.push("/dashboard");
    }
    if (this.props.userSignedUp === 1) {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="SignUp-container">
        <div className="SignUp-block">
          <h2 id="SignUp-notification">
            This is a prototype website, so you can use any email that you can
            think of while signing up. I will not be sending out emails.
          </h2>
          <h1>Sign Up</h1>
          <form onSubmit={this.props.handleSignUpSubmit}>
            <p>Name:</p>
            <input
              type="text"
              name="name"
              onChange={this.props.handleChange}
              value={this.props.name}
            />
            {isEmpty(this.props.authErrors.name) === true ? null : (
              <div className="SignUp-errors">{this.props.authErrors.name}</div>
            )}
            <p>Email:</p>
            <input
              type="email"
              name="email"
              onChange={this.props.handleChange}
              value={this.props.email}
              autoComplete="new-password"
            />
            {isEmpty(this.props.authErrors.email) === true ? null : (
              <div className="SignUp-errors">{this.props.authErrors.email}</div>
            )}
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={this.props.handleChange}
              value={this.props.password}
              autoComplete="new-password"
            />
            {isEmpty(this.props.authErrors.password) === true ? null : (
              <div className="SignUp-errors">
                {this.props.authErrors.password}
              </div>
            )}
            <p>Confirm Password:</p>
            <input
              type="password"
              name="confirmPassword"
              onChange={this.props.handleChange}
              value={this.props.confirmPassword}
            />
            {isEmpty(this.props.authErrors.password2) === true ? null : (
              <div className="SignUp-errors">
                {this.props.authErrors.password2}
              </div>
            )}
            <br />
            <br />
            <ReCaptcha
              theme="dark"
              sitekey="6Lc3YKsUAAAAAC7FT3QfUNx1AauT1wQelSw4NOxu"
              onChange={this.props.captchaSignUpChange}
              style={{ display: "inline-block" }}
            />
            <br />
            <button
              type="submit"
              name="Submit"
              onClick={this.props.handleSignUpSubmit}
              value="CREATE ACCOUNT"
            >
              Submit
            </button>
            <br />
            {isEmpty(this.props.authErrors.misc) === true ? null : (
              <div className="SignUp-errors">{this.props.authErrors.misc}</div>
            )}
          </form>
          <Link to="/login">
            <p className="SignUp-login">Already have an account? Login here.</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
