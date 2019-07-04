import axios from "axios";
import {
  GET_ALL_POSTS,
  GET_FRIENDS_POSTS,
  GET_PROFILE_POSTS,
  CHANGE_CURRENT_FOCUSED_POST,
  POST_ERRORS,
  COMMENT_ERRORS,
  CLEAR_POST_ERRORS,
  CLEAR_COMMENT_ERRORS,
  POST_CREATED,
  POST_DELETED,
  COMMENT_DELETED,
  RECEIVING_POSTS
} from "./types";

export const getAndStoreAllPosts = (amount = 15) => dispatch => {
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
      .post("/api/post/global-posts", { amount: amount }, config)
      .then(data => {
        dispatch({ type: GET_ALL_POSTS, payload: data.data });
        dispatch({ type: RECEIVING_POSTS, payload: 0 });
      })
      .catch(err => {});
  }
};

export const getAndStoreFriendsPosts = (amount = 15) => dispatch => {
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
      .post("/api/post/friends-posts", { amount: amount }, config)
      .then(data => {
        dispatch({ type: GET_FRIENDS_POSTS, payload: data.data });
        dispatch({ type: RECEIVING_POSTS, payload: 0 });
      })
      .catch(err => {});
  }
};

export const getAndStoreProfilePosts = (profileId, amount = 15) => dispatch => {
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
        "/api/post/profile-posts",
        { profileId: profileId, amount: amount },
        config
      )
      .then(data => {
        dispatch({ type: GET_PROFILE_POSTS, payload: data.data });
        dispatch({ type: RECEIVING_POSTS, payload: 0 });
      })
      .catch(err => {});
  }
};

export const createPost = (
  postText,
  profileId,
  allPostsAmount,
  friendsPostsAmount,
  profilePostsAmount
) => dispatch => {
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
    .post("/api/post/create-post", requestBody, config)
    .then(data => {
      if (allPostsAmount < 15) {
        dispatch(getAndStoreAllPosts(15));
      } else {
        dispatch(getAndStoreAllPosts(allPostsAmount));
      }
      if (friendsPostsAmount < 15) {
        dispatch(getAndStoreFriendsPosts(15));
      } else {
        dispatch(getAndStoreFriendsPosts(friendsPostsAmount));
      }

      if (profilePostsAmount < 15) {
        dispatch(getAndStoreProfilePosts(profileId, 15));
      } else {
        dispatch(getAndStoreProfilePosts(profileId, profilePostsAmount));
      }

      dispatch({ type: POST_CREATED, payload: 1 });
      dispatch({ type: CLEAR_POST_ERRORS });
      window.scrollTo(0, 0);
    })
    .catch(err => {
      dispatch({ type: POST_ERRORS, payload: err.response.data.errors });
    });
};

export const createPostOnDifferentProfile = (
  postText,
  profileId,
  allPostsAmount,
  friendsPostsAmount,
  profilePostsAmount
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
    .post("/api/post/create-post-on-different-profile", requestBody, config)
    .then(data => {
      if (allPostsAmount < 15) {
        dispatch(getAndStoreAllPosts(15));
      } else {
        dispatch(getAndStoreAllPosts(allPostsAmount));
      }
      if (friendsPostsAmount < 15) {
        dispatch(getAndStoreFriendsPosts(15));
      } else {
        dispatch(getAndStoreFriendsPosts(friendsPostsAmount));
      }

      if (profilePostsAmount < 15) {
        dispatch(getAndStoreProfilePosts(profileId, 15));
      } else {
        dispatch(getAndStoreProfilePosts(profileId, profilePostsAmount));
      }

      dispatch({ type: POST_CREATED, payload: 1 });
      dispatch({ type: CLEAR_POST_ERRORS });
    })
    .catch(err => {
      dispatch({ type: POST_ERRORS, payload: err.response.data.errors });
    });
};

export const changeCurrentFocusedPost = postId => dispatch => {
  dispatch({ type: CHANGE_CURRENT_FOCUSED_POST, payload: postId });
};

export const createComment = (
  commentText,
  postId,
  profileId,
  allPostsAmount,
  friendsPostsAmount,
  profilePostsAmount
) => dispatch => {
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
    .post("/api/post/create-comment", requestBody, config)
    .then(data => {
      if (allPostsAmount < 15) {
        dispatch(getAndStoreAllPosts(15));
      } else {
        dispatch(getAndStoreAllPosts(allPostsAmount));
      }
      if (friendsPostsAmount < 15) {
        dispatch(getAndStoreFriendsPosts(15));
      } else {
        dispatch(getAndStoreFriendsPosts(friendsPostsAmount));
      }

      if (profilePostsAmount < 15) {
        dispatch(getAndStoreProfilePosts(profileId, 15));
      } else {
        dispatch(getAndStoreProfilePosts(profileId, profilePostsAmount));
      }

      dispatch(changeCurrentFocusedPost(""));
      dispatch({ type: CLEAR_COMMENT_ERRORS });
    })
    .catch(err => {
      dispatch({ type: COMMENT_ERRORS, payload: err.response.data.errors });
    });
};

export const deletePost = (
  postId,
  currentProfile,
  allPostsAmount,
  friendsPostsAmount,
  profilePostsAmount
) => dispatch => {
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
    .put("/api/post/delete-post", requestBody, config)
    .then(data => {
      dispatch(getAndStoreAllPosts(allPostsAmount));
      dispatch(getAndStoreFriendsPosts(friendsPostsAmount));
      dispatch(getAndStoreProfilePosts(currentProfile, profilePostsAmount));
      dispatch({ type: POST_DELETED, payload: 1 });
    })
    .catch(err => {});
};

export const deleteComment = (
  commentId,
  postId,
  currentProfile,
  allPostsAmount,
  friendsPostsAmount,
  profilePostsAmount
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
    .put("/api/post/delete-comment", requestBody, config)
    .then(data => {
      dispatch(getAndStoreAllPosts(allPostsAmount));
      dispatch(getAndStoreFriendsPosts(friendsPostsAmount));
      dispatch(getAndStoreProfilePosts(currentProfile, profilePostsAmount));
      dispatch({ type: COMMENT_DELETED, payload: 1 });
    })
    .catch(err => {});
};
