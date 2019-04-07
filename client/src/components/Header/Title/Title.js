import React from "react";
import { Link } from "react-router-dom";

export default function Title() {
  return (
    <div className="SideBar-container">
      <Link to="/dashboard">
        <h1>BuddyConnect</h1>
      </Link>
    </div>
  );
}
