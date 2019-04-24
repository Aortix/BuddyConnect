import React, { Component } from "react";
import { Link } from "react-router-dom";

import isEmpty from "./../../utilities/isEmpty";
import "./Login.css";

class Login extends Component {
  componentDidMount = () => {
    if (this.props.authenticated === true) {
      this.props.history.push("/dashboard");
    }
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
          Email: <br />
          <input
            type="email"
            name="loginEmail"
            onChange={this.props.handleChange}
            value={this.props.loginEmail}
          />
          {isEmpty(this.props.authErrors.email) === true ? null : (
            <p>{this.props.authErrors.email}</p>
          )}
          <br />
          Password: <br />
          <input
            type="password"
            name="loginPassword"
            onChange={this.props.handleChange}
            value={this.props.loginPassword}
          />
          {isEmpty(this.props.authErrors.password) === true ? null : (
            <p>{this.props.authErrors.password}</p>
          )}
          <br /> <br />
          <input type="submit" name="Submit" value="GO" formNoValidate />
        </form>
        {isEmpty(this.props.authErrors.misc) === true ? null : (
          <p>{this.props.authErrors.misc}</p>
        )}
        <Link to="/sign-up">
          <p>Need to create an account? Click here.</p>
        </Link>
      </div>
    );
  }
}

export default Login;
