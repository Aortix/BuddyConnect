import React, { Component } from "react";
import { Link } from "react-router-dom";

import isEmpty from "./../../utilities/isEmpty";
import "./SignUp.css";

class SignUp extends Component {
  componentDidMount = () => {
    if (this.props.authenticated === true) {
      this.props.history.push("/dashboard");
    }
    console.log(this.props.authErrors);
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
        <h1>Sign Up</h1>
        <form onSubmit={this.props.handleSignUpSubmit}>
          Name: <br />
          <input
            type="text"
            name="name"
            onChange={this.props.handleChange}
            value={this.props.name}
          />
          <br />
          {isEmpty(this.props.authErrors.name) === true ? null : (
            <p>{this.props.authErrors.name}</p>
          )}
          Email: <br />
          <input
            type="email"
            name="email"
            onChange={this.props.handleChange}
            value={this.props.email}
          />
          <br />
          {isEmpty(this.props.authErrors.email) === true ? null : (
            <p>{this.props.authErrors.email}</p>
          )}
          Password: <br />
          <input
            type="password"
            name="password"
            onChange={this.props.handleChange}
            value={this.props.password}
          />
          <br />
          {isEmpty(this.props.authErrors.password) === true ? null : (
            <p>{this.props.authErrors.password}</p>
          )}
          Confirm Password: <br />
          <input
            type="password"
            name="confirmPassword"
            onChange={this.props.handleChange}
            value={this.props.confirmPassword}
          />
          <br />
          {isEmpty(this.props.authErrors.password2) === true ? null : (
            <p>{this.props.authErrors.password2}</p>
          )}
          <br />
          <input
            type="submit"
            name="Submit"
            onClick={this.props.handleSignUpSubmit}
            value="CREATE ACCOUNT"
          />
        </form>
        <Link to="/login">
          <p>Already have an account? Login here.</p>
        </Link>
      </div>
    );
  }
}

export default SignUp;
