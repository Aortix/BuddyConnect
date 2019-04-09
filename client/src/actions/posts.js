import axios from "axios";
import {
  GET_GLOBAL_POSTS,
  GET_FRIENDS_POSTS,
  CHANGE_CURRENT_POST,
  CHANGE_ADD_BUTTON
} from "./types";

export const getAllPosts = () => dispatch => {
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
        dispatch({ type: GET_GLOBAL_POSTS, payload: data.data });
      })
      .catch(err => {
        return console.log(err);
      });
  }
};

export const getFriendsPosts = () => dispatch => {
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

export const changeAddComment = postId => dispatch => {
  //Can make more specific to only open panel on friends posts vs global posts
  /*let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };

  let requestBody = {
    postId: postId
  };
  axios
    .put(
      "http://localhost:5000/api/post/click-add_comment-button",
      requestBody,
      config
    )*/
  dispatch({ type: CHANGE_ADD_BUTTON, payload: postId })
    .then(data => {
      console.log(data);
      dispatch(getAllPosts());
      dispatch(getFriendsPosts());
    })
    .catch(err => {
      return console.log(err);
    });
};

export const createPost = postText => dispatch => {
  let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };

  let requestBody = {
    post: postText
  };
  axios
    .post("http://localhost:5000/api/post/create-post", requestBody, config)
    .then(data => {
      console.log(data);
      dispatch(getAllPosts());
    })
    .catch(err => {
      return console.log(err);
    });
};

export const changePostId = postId => dispatch => {
  dispatch({ type: CHANGE_CURRENT_POST, payload: postId });
};

export const createComment = (commentText, postId) => dispatch => {
  let token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };

  let requestBody = {
    comment: commentText,
    post: postId
  };
  axios
    .post("http://localhost:5000/api/post/create-comment", requestBody, config)
    .then(data => {
      console.log(data);
      dispatch(getAllPosts());
      dispatch(getFriendsPosts());
    })
    .catch(err => {
      return console.log(err);
    });
};
