import React from "react";

export default function ChangeEmail(props) {
  return (
    <div>
      Change Email:
      <form onSubmit={props.handleEmailSubmit}>
        New Email:{" "}
        <input
          type="email"
          name="email"
          value={props.email}
          onChange={props.handleInput}
          required
        />
        <br />
        {props.settingsErrors.email !== undefined ? (
          <p>{props.settingsErrors.email}</p>
        ) : null}
        Current Password:{" "}
        <input
          type="password"
          name="emailPassword2"
          value={props.emailPassword2}
          onChange={props.handleInput}
          required
        />
        {props.settingsErrors.emailPassword !== undefined ? (
          <p>{props.settingsErrors.emailPassword}</p>
        ) : null}
        <input type="submit" name="Submit" formNoValidate />
        <br />
      </form>
    </div>
  );
}
