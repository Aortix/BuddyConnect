import React from "react";

import "./DeleteAccount.css";

export default function DeleteAccount(props) {
  return (
    <div className="DeleteAccount-container">
      <form onSubmit={props.handleDeleteAccount}>
        <span>Current Password: </span>
        <input
          className="DeleteAccount-user_input"
          type="password"
          name="deleteAccountPassword2"
          value={props.deleteAccountPassword2}
          onChange={props.handleInput}
          required
        />
        <br />
        {props.settingsErrors.deleteAccountPassword !== undefined
          ? props.settingsErrors.deleteAccountPassword
          : null}
        <button type="submit" name="Submit" formNoValidate>
          DELETE ACCOUNT
        </button>
      </form>
      <p className="DeleteAccount-text">
        *Requires entering your current password
      </p>
    </div>
  );
}
