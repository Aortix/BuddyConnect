import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

export default function SideBar(props) {
  if (props.authenticated !== true) {
    return (
      <div className="SideBar-container" id="SideBar">
        <ul>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/sign-up">
            <li>Sign Up</li>
          </Link>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="SideBar-container" id="SideBar">
        <ul>
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to={`/profile/${props.myProfile}`}>
            <li>Profile</li>
          </Link>
          <Link to="/settings">
            <li>Settings</li>
          </Link>
          <Link to="/login">
            <li onClick={props.authLogout}>Sign Out</li>
          </Link>
        </ul>
      </div>
    );
  }
}
