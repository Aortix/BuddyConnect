import React, { Component } from "react";

import "./Interests.css";

class Interests extends Component {
  state = {
    editingInterests: false,
    interestsText: this.props.currentInterests
  };

  handleInterestsClick = () => {
    this.setState({ editingInterests: !this.state.editingInterests });
  };

  handleInput = e => {
    this.setState({ interestsText: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({ editingInterests: false });
    this.props.changeInterests(
      this.state.interestsText,
      this.props.currentProfile
    );
  };

  render() {
    if (this.props.currentProfile === this.props.myProfile) {
      return this.state.editingInterests === false ? (
        <div className="Interests-container">
          <i onClick={this.handleInterestsClick} className="fas fa-edit" />
          &nbsp;
          <span>{this.props.currentInterests}</span>
        </div>
      ) : (
        <div className="Interests-container">
          <form onSubmit={this.handleFormSubmit}>
            <textarea
              value={this.state.interestsText}
              onChange={this.handleInput}
            />
            <br />
            <input
              className="Interests-submit_button"
              type="submit"
              name="Submit"
            />
          </form>
        </div>
      );
    } else {
      return (
        <div className="Interests-container">
          <p onClick={this.handleInterestsClick}>
            {this.props.currentInterests}
          </p>
        </div>
      );
    }
  }
}

export default Interests;
