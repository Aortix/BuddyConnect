import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

export default function SideBar(props) {
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
          <Link to={`/profile/${props.myProfile}`}>
            <li
              onClick={() => {
                document
                  .getElementById("SideBar")
                  .classList.toggle("SideBar-container-visible");
              }}
            >
              Profile
            </li>
          </Link>
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
      </div>
    );
  }
}
