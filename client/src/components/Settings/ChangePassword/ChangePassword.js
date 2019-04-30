import React from "react";

import "./ChangePassword.css";

export default function ChangePassword(props) {
  return (
    <div className="ChangePassword-container">
      <h3 className="ChangePassword-heading">Change Password: </h3>
      <form onSubmit={props.handlePasswordSubmit}>
        <span>New Password: </span>
        <input
          className="ChangePassword-user_input_password"
          type="password"
          name="password"
          value={props.password}
          onChange={props.handleInput}
          required
        />
        <br />
        {props.settingsErrors.passwordPassword !== undefined ? (
          <p>{props.settingsErrors.passwordPassword}</p>
        ) : null}
        <span>Current Password: </span>
        <input
          className="ChangePassword-user_input_password2"
          type="password"
          name="passwordPassword2"
          value={props.passwordPassword2}
          onChange={props.handleInput}
          required
        />
        <input
          className="ChangePassword-submit_button"
          type="submit"
          name="Submit"
          value="Save"
          formNoValidate
        />
        <br />
        {props.settingsErrors.passwordPassword2 !== undefined ? (
          <p>{props.settingsErrors.passwordPassword2}</p>
        ) : null}
      </form>
    </div>
  );
}
