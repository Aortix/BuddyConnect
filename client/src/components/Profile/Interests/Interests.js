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
    this.props.changeInterests(this.state.interestsText);
  };

  render() {
    return this.state.editingInterests === false ? (
      <div className={this.props.className} id={this.props.id}>
        <p onClick={this.handleInterestsClick}>{this.props.currentInterests}</p>
      </div>
    ) : (
      <div className={this.props.className} id={this.props.id}>
        <form onSubmit={this.handleFormSubmit}>
          <textarea
            value={this.state.interestsText}
            onChange={this.handleInput}
          />
          <input type="submit" name="Submit" />
        </form>
      </div>
    );
  }
}

export default Interests;
