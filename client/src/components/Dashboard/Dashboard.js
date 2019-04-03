import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class Dashboard extends Component {
  componentDidMount = () => {
    this.props.authCheck();
  };

  render() {
    return this.props.authenticated === true ? (
      <div>
        <h2>Dashboard for authorized users.</h2>
        <h3>Posts Here:</h3>
        {console.log("It did hit here!")}
      </div>
    ) : (
      <div>
        {console.log(this.props.authenticated)}
        {this.props.history.push("/login")}
      </div>
    );
  }
}
