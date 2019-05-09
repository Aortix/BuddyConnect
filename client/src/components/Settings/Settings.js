import React, { Component } from "react";

import "./Settings.css";

import ChangeName from "./ChangeName/ChangeName";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import ChangePassword from "./ChangePassword/ChangePassword";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

export default class Settings extends Component {
  componentDidMount = () => {
    window.localStorage.setItem("location", "/settings");
  };

  componentWillUnmount = () => {
    window.localStorage.setItem("location", "/dashboard");
  };

  state = {
    name: "",
    email: "",
    password: "",
    emailPassword2: "",
    passwordPassword2: "",
    deleteAccountPassword2: ""
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNameSubmit = e => {
    e.preventDefault();
    this.props.changeName(this.state.name);
    this.setState({
      name: "",
      email: "",
      password: "",
      emailPassword2: "",
      passwordPassword2: "",
      deleteAccountPassword2: ""
    });
    setTimeout(() => {
      this.props.clearNameChanged();
    }, 4000);
  };

  handleEmailSubmit = e => {
    e.preventDefault();
    this.props.changeEmail(this.state.email, this.state.emailPassword2);
    this.setState({
      name: "",
      email: "",
      password: "",
      emailPassword2: "",
      passwordPassword2: "",
      deleteAccountPassword2: ""
    });
    setTimeout(() => {
      this.props.clearEmailChanged();
    }, 4000);
  };

  handlePasswordSubmit = e => {
    e.preventDefault();
    this.props.changePassword(
      this.state.password,
      this.state.passwordPassword2
    );
    this.setState({
      name: "",
      email: "",
      password: "",
      emailPassword2: "",
      passwordPassword2: "",
      deleteAccountPassword2: ""
    });
    setTimeout(() => {
      this.props.clearPasswordChanged();
    }, 4000);
  };

  handleDeleteAccount = e => {
    e.preventDefault();
    this.props.deleteAccount(this.state.deleteAccountPassword2);
    this.setState({
      name: "",
      email: "",
      password: "",
      emailPassword2: "",
      passwordPassword2: "",
      deleteAccountPassword2: ""
    });
    setTimeout(() => {
      this.props.clearAccountDeletedChanged();
    }, 4000);
  };

  render() {
    return (
      <div className="Settings-container-absolute">
        <div className="Settings-container">
          <h1>Settings</h1>
          <ChangeName
            name={this.state.name}
            handleInput={this.handleInput}
            handleNameSubmit={this.handleNameSubmit}
            settingsErrors={this.props.settingsErrors}
          />
          {this.props.nameChanged === 1 ? (
            <div className="Settings-successes">Name successfully changed!</div>
          ) : null}
          <ChangeEmail
            email={this.state.email}
            emailPassword2={this.state.emailPassword2}
            handleInput={this.handleInput}
            handleEmailSubmit={this.handleEmailSubmit}
            settingsErrors={this.props.settingsErrors}
          />
          {this.props.emailChanged === 1 ? (
            <div className="Settings-successes">
              Email successfully changed!
            </div>
          ) : null}
          <ChangePassword
            password={this.state.password}
            passwordPassword2={this.state.passwordPassword2}
            handleInput={this.handleInput}
            handlePasswordSubmit={this.handlePasswordSubmit}
            settingsErrors={this.props.settingsErrors}
          />
          {this.props.passwordChanged === 1 ? (
            <div className="Settings-successes">
              Password successfully changed!
            </div>
          ) : null}
        </div>
        <div className="Settings-DeleteAccount">
          <DeleteAccount
            deleteAccountPassword2={this.state.deleteAccountPassword2}
            handleInput={this.handleInput}
            handleDeleteAccount={this.handleDeleteAccount}
            settingsErrors={this.props.settingsErrors}
          />

          {this.props.deleteAccountChanged === 1 ? (
            <div className="Settings-successes">
              Account successfully deleted!
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
