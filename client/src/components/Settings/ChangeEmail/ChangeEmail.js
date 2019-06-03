import React from "react";

import "./ChangeEmail.css";

export default function ChangeEmail(props) {
  return (
    <div className="ChangeEmail-container">
      <h3 className="ChangeEmail-heading">Change Email:</h3>
      <form onSubmit={props.handleEmailSubmit}>
        <span>New Email: </span>
        <input
          className="ChangeEmail-user_input_email"
          type="email"
          name="email"
          value={props.email}
          onChange={props.handleInput}
          autoComplete="new-password"
          required
        />
        <br />
        {props.settingsErrors.email !== undefined ? (
          <div className="ChangeEmail-errors">{props.settingsErrors.email}</div>
        ) : null}
        Current Password:{" "}
        <input
          className="ChangeEmail-user_input_password"
          type="password"
          name="emailPassword2"
          value={props.emailPassword2}
          onChange={props.handleInput}
          autoComplete="new-password"
          required
        />
        {props.settingsErrors.emailPassword !== undefined ? (
          <div className="ChangeEmail-errors">
            {props.settingsErrors.emailPassword}
          </div>
        ) : null}
        <button
          className="ChangeEmail-submit_button"
          type="submit"
          name="Submit"
          value="Save"
          formNoValidate
        >Save</button>
        <br />
      </form>
    </div>
  );
}
