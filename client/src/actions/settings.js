import axios from "axios";

import {
  SETTINGS_ERRORS,
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  DELETE_ACCOUNT_CHANGED
} from "./types";
import { getAndStoreAllPosts, getAndStoreFriendsPosts } from "./posts";
import { getAndStoreMyProfile } from "./profile";
import { authLogout } from "./auth";

export const changeName = name => dispatch => {
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
      .put("http://localhost:5000/api/user/update-name", { name: name }, config)
      .then(data => {
        window.localStorage.setItem("name", data.data);
        dispatch(getAndStoreAllPosts());
        dispatch(getAndStoreFriendsPosts());
        dispatch(getAndStoreMyProfile());
        dispatch({ type: NAME_CHANGED, payload: 1 });
      })
      .catch(err => {
        dispatch({ type: SETTINGS_ERRORS, payload: err.response.data.errors });
      });
  }
};

export const changeEmail = (email, password2) => dispatch => {
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
        "http://localhost:5000/api/user/update-email",
        { email: email, emailPassword: password2 },
        config
      )
      .then(data => {
        dispatch({ type: EMAIL_CHANGED, payload: 1 });
      })
      .catch(err => {
        dispatch({ type: SETTINGS_ERRORS, payload: err.response.data.errors });
      });
  }
};

export const changePassword = (password, password2) => dispatch => {
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
        "http://localhost:5000/api/user/update-password",
        { passwordPassword: password, passwordPassword2: password2 },
        config
      )
      .then(data => {
        dispatch({ type: PASSWORD_CHANGED, payload: 1 });
      })
      .catch(err => {
        dispatch({ type: SETTINGS_ERRORS, payload: err.response.data.errors });
      });
  }
};

export const deleteAccount = password2 => dispatch => {
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
        "http://localhost:5000/api/user/delete-user",
        { deleteAccountPassword: password2 },
        config
      )
      .then(data => {
        dispatch({ type: DELETE_ACCOUNT_CHANGED, payload: 1 });
        setTimeout(() => dispatch(authLogout()), 3000);
      })
      .catch(err => {
        dispatch({ type: SETTINGS_ERRORS, payload: err.response.data.errors });
      });
  }
};
