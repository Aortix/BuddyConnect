import React from "react";
import "./Header.css";

//Components
import Title from "./Title/Title";
import HeaderAuth from "./HeaderAuth/HeaderAuth";

export default function Header(props) {
  return (
    <div className="Header-container">
      <Title />
      <HeaderAuth authLogout={props.authLogout} />
    </div>
  );
}
