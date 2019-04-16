import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            name="email"
            onChange={this.props.handleChange}
            value={this.props.email}
          />
          <br />
          Password: <br />
          <input
            type="password"
            name="password"
            onChange={this.props.handleChange}
            value={this.props.password}
          />
          <br /> <br />
          <input
            type="submit"
            name="Submit"
            value="GO"
            onClick={this.props.handleLoginSubmit}
          />
        </form>
        <Link to="/sign-up">
          <p>Need to create an account? Click here.</p>
        </Link>
      </div>
    );
  }
}

export default Login;
