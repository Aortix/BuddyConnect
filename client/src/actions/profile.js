import {
  GET_AND_STORE_A_PROFILE,
  GET_AND_STORE_MY_PROFILE,
  GET_FRIEND_THUMBNAIL,
  ADD_FRIEND,
  CHECK_FOR_FRIEND,
  REVERSE_ADDED_FRIEND,
  PROFILE_ERRORS,
  CLEAR_PROFILE_ERRORS,
  ABOUT_ME_UPDATED,
  INTERESTS_UPDATED,
  CLEAR_INTERESTS_UPDATED,
  CLEAR_ABOUT_ME_UPDATED,
  AVATAR_UPLOADING
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
      .get(`/api/profile/${profileId}`, config)
      .then(data => {
        dispatch({
          type: GET_AND_STORE_A_PROFILE,
          payload: {
            currentProfile: data.data._id,
            currentProfileData: data.data
          }
        });
      })
      .catch(err => {});
  }
};

export const getAndStoreMyProfile = (profileId, profilePostsAmount) => dispatch => {
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
      .get("/api/profile/my/profile", config)
      .then(data => {
        dispatch({ type: GET_AND_STORE_MY_PROFILE, payload: data.data });

        if (profileId !== undefined && profileId !== null) {
          dispatch(getAndStoreProfilePosts(profileId, profilePostsAmount));
          dispatch(getAndStoreAProfile(profileId));
        } else {
          dispatch(getAndStoreProfilePosts(data.data._id, profilePostsAmount));
          dispatch(getAndStoreAProfile(data.data._id));
        }
      })
      .catch(err => {});
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
        "/api/profile/friends/friend-thumbnails",
        { profileId: profileId },
        config
      )
      .then(data => {
        dispatch({ type: GET_FRIEND_THUMBNAIL, payload: data.data });
      })
      .catch(err => {});
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
      .put(`/api/profile/friends/add-friend/`, { profileId: profileId }, config)
      .then(data => {
        dispatch({ type: ADD_FRIEND, payload: 1 });
      })
      .catch(err => {});
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
        "/api/profile/friends/check-for-friend",
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
      .catch(err => {});
  }
};

export const reverseAddedFriend = () => dispatch => {
  dispatch({ type: REVERSE_ADDED_FRIEND, payload: 0 });
};

export const changeAvatar = (fileData, profileId, allPostsAmount, friendsPostsAmount, profilePostsAmount) => dispatch => {
  dispatch({ type: AVATAR_UPLOADING, payload: 1 });
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
      .post("/api/user/update-avatar", newFormData, config)
      .then(data => {
        setTimeout(() => {
          dispatch(getAndStoreAProfile(profileId));
          window.localStorage.setItem("avatar", data.data);
          dispatch(getAndStoreAllPosts(allPostsAmount));
          dispatch(getAndStoreFriendsPosts(friendsPostsAmount));
          dispatch(getAndStoreProfilePosts(profileId, profilePostsAmount));
          dispatch({ type: CLEAR_PROFILE_ERRORS });
          dispatch({ type: AVATAR_UPLOADING, payload: 0 });
        }, 4000);
      })
      .catch(err => {
        dispatch({ type: AVATAR_UPLOADING, payload: 0 });
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
      .put("/api/profile/update/update-header", { header: headerData }, config)
      .then(() => {
        dispatch(getAndStoreAProfile(profileId));
      })
      .catch(err => {});
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
        "/api/profile/update/update-aboutMe",
        { aboutMe: aboutMeData },
        config
      )
      .then(() => {
        dispatch(getAndStoreAProfile(profileId));
        dispatch({ type: ABOUT_ME_UPDATED, payload: 1 });
        setTimeout(() => {
          dispatch({ type: CLEAR_ABOUT_ME_UPDATED, payload: 0 });
        }, 3000);
      })
      .catch(err => {
        dispatch({ type: PROFILE_ERRORS, payload: err.response.data.errors });
        setTimeout(() => dispatch({ type: CLEAR_PROFILE_ERRORS }), 3000);
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
        "/api/profile/update/update-interests",
        { interests: interestsData },
        config
      )
      .then(() => {
        dispatch(getAndStoreAProfile(profileId));
        dispatch({ type: INTERESTS_UPDATED, payload: 1 });
        setTimeout(() => {
          dispatch({ type: CLEAR_INTERESTS_UPDATED, payload: 0 });
        }, 3000);
      })
      .catch(err => {
        dispatch({ type: PROFILE_ERRORS, payload: err.response.data.errors });
        setTimeout(() => dispatch({ type: CLEAR_PROFILE_ERRORS }), 3000);
      });
  }
};

export const deleteFriend = (friendId, friendsPostsAmount) => dispatch => {
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
      .put("/api/profile/friends/delete-friend", { friendId: friendId }, config)
      .then(data => {
        dispatch(checkForFriend(friendId));
        dispatch(getAndStoreFriendsPosts(friendsPostsAmount));
      })
      .catch(err => {});
  }
};
