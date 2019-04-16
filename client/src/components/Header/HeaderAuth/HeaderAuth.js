import React from "react";
import { Link } from "react-router-dom";
import "./../Header.css";

export const HeaderAuth = props => {
  if (props.authenticated === true) {
    return (
      <div className="HeaderAuth-container">
        <span
          onClick={() => {
            props.changeLocation(props.myProfile);
          }}
        >
          Profile{" "}
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
