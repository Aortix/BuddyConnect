import React from "react";

import "./LoadMorePosts.css";

export default function LoadMorePosts(props) {
  return (
    <div className="LoadMorePosts-container">
      <h1
        onClick={() => {
          if (props.currentProfile === undefined) {
            props.getAndStorePosts(props.posts.length + 5);
          } else {
            props.getAndStorePosts(
              props.currentProfile,
              props.posts.length + 5
            );
          }
        }}
        className="LoadMorePosts-text"
      >
        Load More Posts
      </h1>
    </div>
  );
}
