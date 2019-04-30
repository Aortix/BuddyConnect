import {
  GET_AND_STORE_A_PROFILE,
  GET_AND_STORE_MY_PROFILE,
  GET_FRIEND_THUMBNAIL,
  ADD_FRIEND,
  CHECK_FOR_FRIEND,
  REVERSE_ADDED_FRIEND,
  PROFILE_ERRORS,
  CLEAR_PROFILE_ERRORS
} from "./types";
import axios from "axios";
import {
  getAndStoreAllPosts,
  getAndStoreFriendsPosts,
  getAndStoreProfilePosts
} from "./posts";

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

export const getAndStoreMyProfile = profileId => dispatch => {
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
        dispatch({ type: GET_AND_STORE_MY_PROFILE, payload: data.data });
        console.log(profileId);
        if (profileId !== undefined && profileId !== null) {
          console.log("Someones profile was called.");
          dispatch(getAndStoreProfilePosts(profileId));
          dispatch(getAndStoreAProfile(profileId));
        } else {
          console.log("My profile was called.");
          dispatch(getAndStoreProfilePosts(data.data._id));
          dispatch(getAndStoreAProfile(data.data._id));
        }
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

export const changeAvatar = (fileData, profileId) => dispatch => {
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
      .then(data => {
        console.log("Avatar uploaded.");
        dispatch(getAndStoreAProfile(profileId));
        window.localStorage.setItem("avatar", data.data);
        dispatch(getAndStoreAllPosts());
        dispatch(getAndStoreFriendsPosts());
        dispatch(getAndStoreProfilePosts(profileId));
        dispatch({ type: CLEAR_PROFILE_ERRORS });
      })
      .catch(err => {
        console.log("This is NOT an image!");
        dispatch({ type: PROFILE_ERRORS, payload: err.response.data });
      });
  }
};

export const changeHeader = (headerData, profileId) => dispatch => {
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
        dispatch(getAndStoreAProfile(profileId));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const changeAboutMe = (aboutMeData, profileId) => dispatch => {
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
        dispatch(getAndStoreAProfile(profileId));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const changeInterests = (interestsData, profileId) => dispatch => {
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
        dispatch(getAndStoreAProfile(profileId));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const deleteFriend = friendId => dispatch => {
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
        "http://localhost:5000/api/profile/friends/delete-friend",
        { friendId: friendId },
        config
      )
      .then(data => {
        dispatch(checkForFriend(friendId));
        dispatch(getAndStoreFriendsPosts());
      })
      .catch(err => {
        console.log(err);
      });
  }
};
