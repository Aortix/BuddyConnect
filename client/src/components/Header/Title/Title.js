import React from "react";
import { Link } from "react-router-dom";

import "./Title.css";

export default function Title() {
  return (
    <div className="Title-container">
      <span
        onClick={() => {
          document
            .getElementById("SideBar")
            .classList.toggle("SideBar-container-visible");
        }}
      >
        <i id="dropdown-image" className="fas fa-bars"></i>
      </span>
      <Link to="/dashboard">
        <span className="Title">BuddyConnect</span>
      </Link>
    </div>
  );
}
