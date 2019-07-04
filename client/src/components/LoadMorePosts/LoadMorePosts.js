import React from "react";

import "./LoadMorePosts.css";

export default function LoadMorePosts(props) {
  return (
    <div className="LoadMorePosts-container">
      {props.receivingPosts === 0 ? (
        <h1
          onClick={() => {
            if (props.currentProfile === undefined) {
              props.getAndStorePosts(props.posts.length + 15);
              props.getReceivingPosts(1);
            } else {
              props.getAndStorePosts(
                props.currentProfile,
                props.posts.length + 15
              );
              props.getReceivingPosts(1);
            }
          }}
          className="LoadMorePosts-text"
        >
          Load More Posts
        </h1>
      ) : (
        <i
          className="fas fa-spinner fa-spin fa-2x"
          style={{ marginBottom: "25px" }}
        />
      )}
    </div>
  );
}
