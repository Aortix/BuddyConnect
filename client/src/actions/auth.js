import axios from "axios";
import {
  LOGIN,
  AUTHENTICATED,
  LOGOUT,
  USER_SIGNED_UP,
  ERROR
} from "./../actions/types";

export const authSignUp = (
  name,
  email,
  password,
  confirmPassword
) => dispatch => {
  const requestBody = {
    name,
    email,
    password,
    password2: confirmPassword
  };
  axios
    .post("/api/user/sign-up", requestBody)
    .then(data => {
      dispatch({ type: USER_SIGNED_UP, payload: 1 });
      dispatch({ type: USER_SIGNED_UP, payload: 0 });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data.errors });
    });
};

export const authLogin = (email, password) => dispatch => {
  const requestBody = {
    email,
    password
  };
  axios
    .post("/api/user/login", requestBody)
    .then(data => {
      dispatch({
        type: LOGIN,
        payload: {
          email: email
        }
      });
      window.localStorage.setItem("token", data.data.token);
      window.localStorage.setItem("avatar", data.data.avatar);
      window.localStorage.setItem("name", data.data.name);
      if (
        window.localStorage.getItem("location") === null ||
        window.localStorage.getItem("location") === null
      ) {
        window.localStorage.setItem("location", "/dashboard");
      }
    })
    .then(() => {
      dispatch(authCheck());
      dispatch({ type: USER_SIGNED_UP, payload: 2 });
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data.errors });
    });
};

export const authLogout = () => dispatch => {
  window.localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
    payload: 0
  });
  dispatch({ type: USER_SIGNED_UP, payload: 0 });
};

export const authCheck = () => dispatch => {
  //Grab the token
  let token = window.localStorage.getItem("token");
  //Run a series of test to validate the token, if one fails then return null (will update with more tests)
  if (token === undefined || token === null || token === "undefined") {
    return null;
  } else {
    //Create form to be sent to backend
    const requestBody = {
      token: token
    };

    //Configure headers for backend
    const config = {
      headers: {
        Authorization: token
      }
    };

    //Make the call to this route on the backend to ensure token corresponds to a user
    axios
      .post("/api/user/verify-user", requestBody, config)
      .then(() => {
        //Authenticate the user in redux state
        dispatch({
          type: AUTHENTICATED,
          payload: 1
        });
      })
      .catch(err => {
        //Unauthenticate the user in redux state
        dispatch({
          type: AUTHENTICATED,
          payload: 0
        });
      });
  }
};
