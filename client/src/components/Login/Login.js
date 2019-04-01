import React from "react";

export default function Login(props) {
  return (
    <div className="Login-container">
      <h1>Login</h1>
      <form onSubmit={props.handleLoginSubmit}>
        <label>
          Email: <br />
          <input
            type="email"
            name="email"
            onChange={props.handleChange}
            value={props.email}
          />
          <br />
        </label>
        <label>
          Password: <br />
          <input
            type="password"
            name="password"
            onChange={props.handleChange}
            value={props.password}
          />
        </label>
        <br /> <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
