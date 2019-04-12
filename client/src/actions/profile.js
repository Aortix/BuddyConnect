import {
  GET_AND_STORE_A_PROFILE,
  GET_AND_STORE_MY_PROFILE,
  GET_FRIEND_THUMBNAIL
} from "./types";
import axios from "axios";

export const getAndStoreAProfile = profileId => dispatch => {
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
        dispatch({
          type: GET_AND_STORE_A_PROFILE,
          payload: {
            currentProfile: data.data._id,
            currentProfileData: data.data
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getAndStoreMyProfile = () => dispatch => {
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
        dispatch({ type: GET_AND_STORE_MY_PROFILE, payload: data.data._id });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const showFriends = profileId => dispatch => {
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
        "http://localhost:5000/api/profile/friends/friend-thumbnails",
        { profileId: profileId },
        config
      )
      .then(data => {
        console.log("Getting your friends!");
        dispatch({ type: GET_FRIEND_THUMBNAIL, payload: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
