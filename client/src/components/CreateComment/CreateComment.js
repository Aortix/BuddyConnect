import React from "react";

export default function CreateComment(props) {
  return (
    <div className="CreateComment-container">
      <form>
        <textarea
          onChange={props.changeCommentText}
          value={props.commentText}
          placeholder="Create Comments Here..."
        />
        <br />
        <input type="submit" value="Submit" onClick={props.submitCommentForm} />
      </form>
    </div>
  );
}
