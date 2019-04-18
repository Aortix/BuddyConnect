import React from "react";
import { Link } from "react-router-dom";
import ElementDropdownImage from "./../../../images/elementDropdownImage.svg";

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
        <img src={ElementDropdownImage} alt="Dropdown" />
      </span>
      <Link to="/dashboard">
        <span className="Title">BuddyConnect</span>
      </Link>
    </div>
  );
}
