import {
  GET_AND_STORE_A_PROFILE,
  GET_AND_STORE_MY_PROFILE,
  GET_FRIEND_THUMBNAIL,
  ADD_FRIEND,
  CHECK_FOR_FRIEND,
  REVERSE_ADDED_FRIEND
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
        console.log("Was this called?");
        dispatch({ type: GET_AND_STORE_MY_PROFILE, payload: data.data });
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

export const addFriend = profileId => dispatch => {
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
      .put(
        `http://localhost:5000/api/profile/add-friend/`,
        { profileId: profileId },
        config
      )
      .then(data => {
        console.log("Added a friend!");
        dispatch({ type: ADD_FRIEND, payload: 1 });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const checkForFriend = profileId => dispatch => {
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
        "http://localhost:5000/api/profile/friends/check-for-friend",
        { profileId: profileId },
        config
      )
      .then(data => {
        if (data.data === true) {
          dispatch({ type: CHECK_FOR_FRIEND, payload: 1 });
        } else {
          dispatch({ type: CHECK_FOR_FRIEND, payload: 0 });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const reverseAddedFriend = () => dispatch => {
  dispatch({ type: REVERSE_ADDED_FRIEND, payload: 0 });
};

export const changeAvatar = fileData => dispatch => {
  let token = window.localStorage.getItem("token");
  if (token === undefined || token === null || token === "undefined") {
    return null;
  } else {
    const newFormData = new FormData();
    newFormData.append("avatar", fileData);
    const config = {
      headers: {
        Authorization: token,
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:5000/api/user/update-avatar", newFormData, config)
      .then(() => {
        console.log("Avatar uploaded.");
        dispatch(getAndStoreMyProfile());
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const changeHeader = headerData => dispatch => {
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
      .put(
        "http://localhost:5000/api/profile/update/update-header",
        { header: headerData },
        config
      )
      .then(() => {
        console.log("Header updated.");
        dispatch(getAndStoreMyProfile());
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const changeAboutMe = aboutMeData => dispatch => {
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
      .put(
        "http://localhost:5000/api/profile/update/update-aboutMe",
        { aboutMe: aboutMeData },
        config
      )
      .then(() => {
        console.log("AboutMe updated.");
        dispatch(getAndStoreMyProfile());
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const changeInterests = interestsData => dispatch => {
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
      .put(
        "http://localhost:5000/api/profile/update/update-interests",
        { interests: interestsData },
        config
      )
      .then(() => {
        console.log("Interests updated.");
        dispatch(getAndStoreMyProfile());
      })
      .catch(err => {
        console.log(err);
      });
  }
};
