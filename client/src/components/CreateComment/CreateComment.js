import React from "react";

export default function CreateComment(props) {
  return (
    <div>
      <form>
        <textarea
          onChange={props.changePostText}
          value={props.postText}
          placeholder="Create Comments Here..."
        />
        <br />
        <input type="submit" value="Submit" onClick={props.submitPostForm} />
      </form>
    </div>
  );
}
