import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

//Actions
import authLogin from "./actions/authLogin";

//Components
import Login from "./components/Login/Login";

class App extends Component {
  state = {
    email: "",
    password: ""
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(
      event.target.email.value,
      event.target.password.value
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className="App">
        <Login
          handleLoginSubmit={this.handleLoginSubmit}
          handleChange={this.handleChange}
          email={this.state.email}
          password={this.state.password}
        />
        <p>
          {this.props.email} {this.props.password} {this.props.token}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.authReducer.email,
  password: state.authReducer.password,
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (email, password) => {
    dispatch(authLogin(email, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
