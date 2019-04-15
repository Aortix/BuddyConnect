import React from "react";
import "./Header.css";

//Components
import Title from "./Title/Title";
import HeaderAuth from "./HeaderAuth/HeaderAuth";

export default function Header(props) {
  return (
    <div className="Header-container">
      <Title />
      <HeaderAuth
        myProfile={props.myProfile}
        authLogout={props.authLogout}
        changeLocation={props.changeLocation}
        authenticated={props.authenticated}
        {...props}
      />
    </div>
  );
}
