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
        <div className={this.props.className} id={this.props.id}>
          <span>{this.props.currentInterests}</span>&nbsp;
          <i onClick={this.handleInterestsClick} className="fas fa-edit" />
        </div>
      ) : (
        <div className={this.props.className} id={this.props.id}>
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
        <div className={this.props.className} id={this.props.id}>
          <p onClick={this.handleInterestsClick}>
            {this.props.currentInterests}
          </p>
        </div>
      );
    }
  }
}

export default Interests;
