import React from "react";

export default function ChangePassword(props) {
  return (
    <div>
      Change Password:
      <form onSubmit={props.handlePasswordSubmit}>
        New Password:{" "}
        <input
          type="password"
          name="password"
          value={props.password}
          onChange={props.handleInput}
          required
        />
        <br />
        Current Password:{" "}
        <input
          type="password"
          name="passwordPassword2"
          value={props.passwordPassword2}
          onChange={props.handleInput}
          required
        />
        <input type="submit" name="Submit" />
        <br />
      </form>
    </div>
  );
}
