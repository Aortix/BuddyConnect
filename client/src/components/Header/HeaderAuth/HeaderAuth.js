import React from "react";
import { Link } from "react-router-dom";

import "./HeaderAuth.css";

export const HeaderAuth = props => {
  if (props.authenticated === true) {
    return (
      <div className="HeaderAuth-container">
        <span
          className="profile-link"
          onClick={() => {
            props.changeLocation(props.myProfile);
          }}
        >
          <span>{window.localStorage.getItem("name")}</span>
          <img
            height="22"
            width="22"
            src={`http://localhost:5000/uploads/avatars/${window.localStorage.getItem(
              "avatar"
            )}`}
            alt="myavatar"
          />
        </span>
        <span>
          <Link to="/login" onClick={props.authLogout}>
            Sign Out
          </Link>
        </span>
      </div>
    );
  } else {
    return (
      <div className="HeaderAuth-container">
        <span>
          <Link to="/login">Login </Link>
        </span>
        <span className="sign-up-text">
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </div>
    );
  }
};

export default HeaderAuth;
