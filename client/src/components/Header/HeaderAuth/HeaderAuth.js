import React from "react";
import { Link } from "react-router-dom";

export default function HeaderAuth() {
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
