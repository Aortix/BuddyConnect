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
          <div className="ChangePassword-errors">
            {props.settingsErrors.passwordPassword}
          </div>
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
        {props.settingsErrors.passwordPassword2 !== undefined ? (
          <div className="ChangePassword-errors">
            {props.settingsErrors.passwordPassword2}
          </div>
        ) : null}
        <input
          className="ChangePassword-submit_button"
          type="submit"
          name="Submit"
          value="Save"
          formNoValidate
        />
        <br />
      </form>
    </div>
  );
}
