import axios from "axios";
import {
  GET_ALL_POSTS,
  GET_FRIENDS_POSTS,
  GET_PROFILE_POSTS,
  CHANGE_CURRENT_FOCUSED_POST,
  POST_ERRORS,
  COMMENT_ERRORS,
  CLEAR_POST_ERRORS,
  CLEAR_COMMENT_ERRORS
} from "./types";

export const getAndStoreAllPosts = () => dispatch => {
  let token = window.localStorage.getItem("token");
  if (token === undefined || token === null || token === "undefined") {
    return null;
  } else {
    const config = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:5000/api/post/global-posts", config)
      .then(data => {
        console.log("Calling global posts");
        dispatch({ type: GET_ALL_POSTS, payload: data.data });
      })
      .catch(err => {
        return console.log(err);
      });
  }
};

export const getAndStoreFriendsPosts = () => dispatch => {
  let token = window.localStorage.getItem("token");
  if (token === undefined || token === null || token === "undefined") {
    return null;
  } else {
    const config = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:5000/api/post/friends-posts", config)
      .then(data => {
        console.log("Calling friends posts!");
        dispatch({ type: GET_FRIENDS_POSTS, payload: data.data });
      })
      .catch(err => {
        return console.log(err);
      });
  }
};

export const getAndStoreProfilePosts = profileId => dispatch => {
  let token = window.localStorage.getItem("token");
  if (token === undefined || token === null || token === "undefined") {
    return null;
  } else {
    const config = {
      headers: {
        Authorization: token
      }
    };
    axios
      .post(
        "http://localhost:5000/api/post/profile-posts",
        { profileId: profileId },
        config
      )
      .then(data => {
        console.log("Calling profile posts!");
        dispatch({ type: GET_PROFILE_POSTS, payload: data.data });
      })
      .catch(err => {
        return console.log(err);
      });
  }
};

export const createPost = (postText, profileId) => dispatch => {
  let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };

  let requestBody = {
    post: postText,
    datePosted: Date.now()
  };
  axios
    .post("http://localhost:5000/api/post/create-post", requestBody, config)
    .then(data => {
      dispatch(getAndStoreAllPosts());
      dispatch(getAndStoreFriendsPosts());
      //dispatch(getAndStoreProfilePosts(profileId));
      dispatch({ type: CLEAR_POST_ERRORS });
    })
    .catch(err => {
      dispatch({ type: POST_ERRORS, payload: err.response.data.errors });
    });
};

export const createPostOnDifferentProfile = (
  postText,
  profileId
) => dispatch => {
  let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };

  let requestBody = {
    post: postText,
    profileId: profileId,
    datePosted: Date.now()
  };
  axios
    .post(
      "http://localhost:5000/api/post/create-post-on-different-profile",
      requestBody,
      config
    )
    .then(data => {
      dispatch(getAndStoreAllPosts());
      dispatch(getAndStoreFriendsPosts());
      dispatch(getAndStoreProfilePosts(profileId));
      dispatch({ type: CLEAR_POST_ERRORS });
    })
    .catch(err => {
      dispatch({ type: POST_ERRORS, payload: err.response.data.errors });
    });
};

export const changeCurrentFocusedPost = postId => dispatch => {
  dispatch({ type: CHANGE_CURRENT_FOCUSED_POST, payload: postId });
};

export const createComment = (commentText, postId, profileId) => dispatch => {
  let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };

  let requestBody = {
    comment: commentText,
    post: postId,
    datePosted: Date.now()
  };
  axios
    .post("http://localhost:5000/api/post/create-comment", requestBody, config)
    .then(data => {
      dispatch(getAndStoreAllPosts());
      dispatch(getAndStoreFriendsPosts());
      dispatch(getAndStoreProfilePosts(profileId));
      dispatch(changeCurrentFocusedPost(""));
      dispatch({ type: CLEAR_COMMENT_ERRORS });
    })
    .catch(err => {
      dispatch({ type: COMMENT_ERRORS, payload: err.response.data.errors });
    });
};

export const deletePost = (postId, currentProfile) => dispatch => {
  let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };
  let requestBody = {
    postId: postId
  };
  axios
    .put("http://localhost:5000/api/post/delete-post", requestBody, config)
    .then(data => {
      dispatch(getAndStoreAllPosts());
      dispatch(getAndStoreFriendsPosts());
      //dispatch(getAndStoreProfilePosts(currentProfile));
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteComment = (
  commentId,
  postId,
  currentProfile
) => dispatch => {
  let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };
  let requestBody = {
    commentId: commentId,
    postId: postId
  };
  axios
    .put("http://localhost:5000/api/post/delete-comment", requestBody, config)
    .then(data => {
      dispatch(getAndStoreAllPosts());
      dispatch(getAndStoreFriendsPosts());
      dispatch(getAndStoreProfilePosts(currentProfile));
    })
    .catch(err => {
      console.log(err);
    });
};
