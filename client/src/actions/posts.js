import axios from "axios";
import { GET_GLOBAL_POSTS } from "./types";

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
        console.log(data);
        dispatch({ type: GET_GLOBAL_POSTS, payload: data.data });
      })
      .catch(err => {
        return console.log(err);
      });
  }
};
