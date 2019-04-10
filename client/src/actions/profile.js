import { GET_PROFILE, GET_MY_PROFILE } from "./types";
import axios from "axios";

export const getProfile = profileId => dispatch => {
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
      .get(`http://localhost:5000/api/profile/${profileId}`, config)
      .then(data => {
        console.log("Get profile should be called!");
        dispatch({
          type: GET_PROFILE,
          payload: { current_profile: data.data._id, profile_data: data.data }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getMyProfile = () => dispatch => {
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
      .get("http://localhost:5000/api/profile/my/profile", config)
      .then(data => {
        console.log(data.data._id);
        dispatch({ type: GET_MY_PROFILE, payload: data.data._id });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
