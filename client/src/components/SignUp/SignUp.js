import React, { Component } from "react";

class SignUp extends Component {
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
      <div>
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
          <br />
          Confirm Password: <br />
          <input
            type="password"
            name="confirm_password"
            onChange={this.props.handleChange}
            value={this.props.confirm_password}
          />
          <br /> <br />
          <input
            type="submit"
            name="Submit"
            onClick={this.props.handleSignUpSubmit}
          />
        </form>
      </div>
    );
  }
}

export default SignUp;
