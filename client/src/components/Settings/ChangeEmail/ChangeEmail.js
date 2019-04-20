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
        Current Password:{" "}
        <input
          type="password"
          name="emailPassword2"
          value={props.emailPassword2}
          onChange={props.handleInput}
          required
        />
        <input type="submit" name="Submit" />
        <br />
      </form>
    </div>
  );
}