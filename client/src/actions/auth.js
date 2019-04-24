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
    .post("http://localhost:5000/api/user/sign-up", requestBody)
    .then(data => {
      console.log("User should have been added.");
      dispatch({ type: USER_SIGNED_UP, payload: 1 });
    })
    .catch(err => {
      console.log(err.response.data.errors);
      dispatch({ type: ERROR, payload: err.response.data.errors });
    });
};

export const authLogin = (email, password) => dispatch => {
  const requestBody = {
    email,
    password
  };
  axios
    .post("http://localhost:5000/api/user/login", requestBody)
    .then(data => {
      dispatch({
        type: LOGIN,
        payload: {
          email: email
        }
      });
      window.localStorage.setItem("token", data.data.token);
      window.localStorage.setItem("avatar", data.data.avatar);
      console.log("Token should be in localstorage.");
    })
    .then(() => {
      dispatch(authCheck());
    })
    .catch(err => {
      console.log(err.response.data.errors);
      dispatch({ type: ERROR, payload: err.response.data.errors });
    });
};

export const authLogout = () => dispatch => {
  window.localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
    payload: false
  });
  dispatch({ type: USER_SIGNED_UP, payload: 1 });
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
      .post("http://localhost:5000/api/user/verify-user", requestBody, config)
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
        console.log(err);
      });
  }
};
