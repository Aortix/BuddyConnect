import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

import DarkTheme from "./DarkTheme/DarkTheme";

export default function SideBar(props) {
  document.addEventListener("click", e => {
    if (e.target.id === "dropdown-image") {
    } else if (
      e.target.id !== "SideBar" &&
      document
        .getElementById("SideBar")
        .classList.contains("SideBar-container-visible")
    ) {
      document
        .getElementById("SideBar")
        .classList.toggle("SideBar-container-visible");
    }
  });
  if (props.authenticated !== true) {
    return (
      <div className="SideBar-container" id="SideBar">
        <ul>
          <Link to="/login">
            <li
              onClick={() => {
                document
                  .getElementById("SideBar")
                  .classList.toggle("SideBar-container-visible");
              }}
            >
              Login
            </li>
          </Link>
          <Link to="/sign-up">
            <li
              onClick={() => {
                document
                  .getElementById("SideBar")
                  .classList.toggle("SideBar-container-visible");
              }}
            >
              Sign Up
            </li>
          </Link>
        </ul>
        <DarkTheme />
      </div>
    );
  } else {
    return (
      <div className="SideBar-container" id="SideBar">
        <ul>
          <Link to="/dashboard">
            <li
              onClick={() => {
                document
                  .getElementById("SideBar")
                  .classList.toggle("SideBar-container-visible");
              }}
            >
              Dashboard
            </li>
          </Link>
          <li
            onClick={() => {
              {
                document
                  .getElementById("SideBar")
                  .classList.toggle("SideBar-container-visible");
                props.changeLocation(props.myProfile);
              }
            }}
          >
            Profile
          </li>
          <Link to="/settings">
            <li
              onClick={() => {
                document
                  .getElementById("SideBar")
                  .classList.toggle("SideBar-container-visible");
              }}
            >
              Settings
            </li>
          </Link>
          <Link to="/login">
            <li
              onClick={() => {
                props.authLogout();
                document
                  .getElementById("SideBar")
                  .classList.toggle("SideBar-container-visible");
              }}
            >
              Sign Out
            </li>
          </Link>
        </ul>
        <DarkTheme />
      </div>
    );
  }
}
