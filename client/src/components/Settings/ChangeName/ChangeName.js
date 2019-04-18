import React from "react";

export default function ChangeName(props) {
  return (
    <div>
      Change Name:
      <form onSubmit={props.handleNameSubmit}>
        New Name:{" "}
        <input
          type="text"
          name="name"
          value={props.name}
          onChange={props.handleInput}
          required
        />
        <input type="submit" name="Submit" value="Save" />
        <br />
      </form>
    </div>
  );
}
