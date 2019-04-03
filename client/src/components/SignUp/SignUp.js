import React from "react";

export default function SignUp(props) {
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={props.handleSignUpSubmit}>
        Name: <br />
        <input
          type="text"
          name="name"
          onChange={props.handleChange}
          value={props.name}
        />
        <br />
        Email: <br />
        <input
          type="email"
          name="email"
          onChange={props.handleChange}
          value={props.email}
        />
        <br />
        Password: <br />
        <input
          type="password"
          name="password"
          onChange={props.handleChange}
          value={props.password}
        />
        <br />
        Confirm Password: <br />
        <input
          type="password"
          name="confirm_password"
          onChange={props.handleChange}
          value={props.confirm_password}
        />
        <br /> <br />
        <input type="submit" name="Submit" onClick={props.handleSignUpSubmit} />
      </form>
    </div>
  );
}
