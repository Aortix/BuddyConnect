import React from "react";

import "./ChangeName.css";

export default function ChangeName(props) {
  return (
    <div className="ChangeName-container">
      <h3 className="ChangeName-heading">Change Name: </h3>
      <form onSubmit={props.handleNameSubmit}>
        <div className="ChangeName-input_bar">
          <span className="ChangeName-new_name">New Name: </span>
          <input
            className="ChangeName-user_input"
            type="text"
            name="name"
            value={props.name}
            onChange={props.handleInput}
            formNoValidate
            required
          />
        </div>
        <input
          className="ChangeName-submit_button"
          type="submit"
          name="Submit"
          value="Save"
        />
        <br />
        {props.settingsErrors.name !== undefined
          ? props.settingsErrors.name
          : null}
      </form>
    </div>
  );
}
