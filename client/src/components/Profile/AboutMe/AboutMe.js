import React, { Component } from "react";

import "./AboutMe.css";

class AboutMe extends Component {
  state = {
    editingAboutMe: false,
    aboutMeText: this.props.currentAboutMe
  };

  handleAboutMeClick = () => {
    this.setState({ editingAboutMe: !this.state.editingAboutMe });
  };

  handleInput = e => {
    this.setState({ aboutMeText: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({ editingAboutMe: false });
    this.props.changeAboutMe(this.state.aboutMeText, this.props.currentProfile);
  };

  render() {
    if (this.props.currentProfile === this.props.myProfile) {
      return this.state.editingAboutMe === false ? (
        <div className="AboutMe-container">
          <i onClick={this.handleAboutMeClick} className="fas fa-edit" />
          &nbsp;
          <span>{this.props.currentAboutMe}</span>
        </div>
      ) : (
        <div className="AboutMe-container">
          <form onSubmit={this.handleFormSubmit}>
            <textarea
              value={this.state.aboutMeText}
              onChange={this.handleInput}
            />
            <br />
            <input
              className="AboutMe-submit_button"
              type="submit"
              name="Submit"
            />
          </form>
        </div>
      );
    } else {
      return (
        <div className="AboutMe-container">
          <p onClick={this.handleAboutMeClick}>{this.props.currentAboutMe}</p>
        </div>
      );
    }
  }
}

export default AboutMe;
