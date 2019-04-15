import React from "react";
import { Link } from "react-router-dom";

export const HeaderAuth = props => {
  if (props.authenticated === true) {
    return (
      <div>
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
      <div>
        <span>
          <Link to="/login">Login </Link>
        </span>
        <span>
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </div>
    );
  }
};

export default HeaderAuth;
