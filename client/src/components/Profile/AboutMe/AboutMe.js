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
    this.props.changeAboutMe(this.state.aboutMeText);
  };

  render() {
    return this.state.editingAboutMe === false ? (
      <div className={this.props.className} id={this.props.id}>
        <p onClick={this.handleAboutMeClick}>{this.props.currentAboutMe}</p>
      </div>
    ) : (
      <div className={this.props.className} id={this.props.id}>
        <form onSubmit={this.handleFormSubmit}>
          <textarea
            value={this.state.aboutMeText}
            onChange={this.handleInput}
          />
          <input type="submit" name="Submit" />
        </form>
      </div>
    );
  }
}

export default AboutMe;
