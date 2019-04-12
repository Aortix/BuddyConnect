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
        getAndStoreAProfile={props.getAndStoreAProfile}
        getAndStoreMyProfile={props.getAndStoreMyProfile}
        authLogout={props.authLogout}
        {...props}
      />
    </div>
  );
}
