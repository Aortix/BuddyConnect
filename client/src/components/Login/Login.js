import React, { Component } from "react";

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
          <label>
            Email: <br />
            <input
              type="email"
              name="email"
              onChange={this.props.handleChange}
              value={this.props.email}
            />
            <br />
          </label>
          <label>
            Password: <br />
            <input
              type="password"
              name="password"
              onChange={this.props.handleChange}
              value={this.props.password}
            />
          </label>
          <br /> <br />
          <input
            type="submit"
            value="Submit"
            onClick={this.props.handleLoginSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;
