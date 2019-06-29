import React, { Component } from "react";

import "./DarkTheme.css";

export default class DarkTheme extends Component {
  componentDidMount = () => {
    if (window.localStorage.getItem("mode") === "Dark") {
      this.changeTheme();
    } else {
      //Do nothing
    }
  };

  state = {
    toggle: 0
  };

  changeTheme = () => {
    if (this.state.toggle === 0) {
      window.localStorage.setItem("mode", "Dark");
      this.setState({ toggle: 1 });
      document.documentElement.style.setProperty("--main-bg-color", "#303030");
      document.documentElement.style.setProperty(
        "--main-text-color",
        "#ffffff"
      );
      document.documentElement.style.setProperty(
        "--secondary-bg-color",
        "#282828"
      );
      document.documentElement.style.setProperty(
        "--secondary-text-color",
        "#f8f8f8"
      );
      document.documentElement.style.setProperty(
        "--border-color-black",
        "#f8f8f8"
      );
      document.documentElement.style.setProperty(
        "--font-awesome-color",
        "#ffffff"
      );
    } else {
      window.localStorage.setItem("mode", "Light");
      this.setState({ toggle: 0 });
      document.documentElement.style.setProperty("--main-bg-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--main-text-color",
        "#282828"
      );
      document.documentElement.style.setProperty(
        "--secondary-bg-color",
        "#fafafa"
      );
      document.documentElement.style.setProperty(
        "--secondary-text-color",
        "#a9a9a9"
      );
      document.documentElement.style.setProperty(
        "--border-color-black",
        "#000000"
      );
      document.documentElement.style.setProperty(
        "--font-awesome-color",
        "#000000"
      );
    }
  };

  render() {
    return (
      <div
        id="toggleDarkTheme"
        className="DarkTheme-container"
        onClick={this.changeTheme}
      >
        {this.state.toggle === 0 ? (
          <i className="fas fa-toggle-off" />
        ) : (
          <i className="fas fa-toggle-on" />
        )}
        &nbsp;<span>Dark Mode</span>
      </div>
    );
  }
}
