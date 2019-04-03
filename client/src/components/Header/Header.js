import React from "react";
import "./Header.css";

//Components
import SideBar from "./SideBar/SideBar";
import PostTabs from "./PostTabs/PostTabs";
import HeaderAuth from "./HeaderAuth/HeaderAuth";

export default function Header(props) {
  return (
    <div className="Header-container">
      <SideBar />
      <PostTabs />
      <HeaderAuth authLogout={props.authLogout} />
    </div>
  );
}
