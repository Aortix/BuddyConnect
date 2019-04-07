import React from "react";

export default function CreatePost(props) {
  return (
    <div>
      <form>
        <textarea
          onChange={props.changePostText}
          value={props.postText}
          placeholder="Create Posts Here..."
        />
        <br />
        <input type="submit" value="Submit" onClick={props.submitPostForm} />
      </form>
    </div>
  );
}
