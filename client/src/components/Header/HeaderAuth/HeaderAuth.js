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
          <img
            height="22"
            width="20"
            src={`https://s3-us-west-2.amazonaws.com/buddyconnectbucket/${window.localStorage.getItem(
              "avatar"
            )}`}
            alt="myavatar"
          />
          <span className="HeaderAuth-name">
            {window.localStorage.getItem("name")}
          </span>
        </span>
        <span>
          <Link to="/login" onClick={props.authLogout}>
            <span className="HeaderAuth-sign_out-text">Sign Out</span>
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
