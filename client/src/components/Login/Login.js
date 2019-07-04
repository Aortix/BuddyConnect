import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import ReCaptcha from "react-google-recaptcha";

class Login extends Component {
  componentDidMount = () => {
    if (this.props.authenticated === true) {
      this.props.history.push("/dashboard");
    }
  };

  componentDidUpdate = prevProps => {
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
            autoComplete="new-password"
          />
          {this.props.authErrors.email !== undefined ? (
            <div className="Login-errors">{this.props.authErrors.email}</div>
          ) : null}
          <p>Password:</p>
          <input
            type="password"
            name="loginPassword"
            onChange={this.props.handleChange}
            value={this.props.loginPassword}
            autoComplete="new-password"
          />
          {this.props.authErrors.password !== undefined ? (
            <div className="Login-errors">{this.props.authErrors.password}</div>
          ) : null}
          {this.props.userSignedUp === 1 ? (
            <div className="Login-successes">User successfully registered!</div>
          ) : null}
          {this.props.attempts > 3 ? (
            <React.Fragment>
              <br />
              <br />
              <ReCaptcha
                theme="dark"
                sitekey="6Lc3YKsUAAAAAC7FT3QfUNx1AauT1wQelSw4NOxu"
                onChange={this.props.captchaLoginChange}
                style={{ display: "inline-block" }}
              />
            </React.Fragment>
          ) : null}
          <button type="submit" name="Submit" value="GO" formNoValidate>
            Submit
          </button>
          {this.props.authErrors.misc !== undefined ? (
            <div className="Login-errors">{this.props.authErrors.misc}</div>
          ) : null}
        </form>
        <Link to="/sign-up">
          <p className="Login-create_account">
            Need to create an account? Click here.
          </p>
        </Link>
      </div>
    );
  }
}

export default Login;
