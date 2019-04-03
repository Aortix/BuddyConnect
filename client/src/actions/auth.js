import axios from "axios";
import { LOGIN_INFORMATION, AUTHENTICATED } from "./../actions/types";

export const authSignUp = (
  name,
  email,
  password,
  confirm_password
) => dispatch => {
  const requestBody = {
    name,
    email,
    password,
    password2: confirm_password
  };
  console.log(requestBody);
  axios
    .post("http://localhost:5000/api/user/sign-up", requestBody)
    .then(data => {
      console.log(data);
      console.log("User should have been added.");
    })
    .catch(err => {
      return err;
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
      console.log(data);
      dispatch({
        type: LOGIN_INFORMATION,
        payload: {
          email: data.email
        }
      });
      window.localStorage.setItem("token", data.data.token);
      console.log("Token should be in localstorage if login was successful.");
    })
    .catch(err => {
      return err;
    });
};

export const authCheck = () => dispatch => {
  const requestBody = {
    token: localStorage.getItem("token")
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  };
  axios
    .post("http://localhost:5000/api/user/verify-user", requestBody, config)
    .then(data => {
      console.log("returned true!");
      dispatch({
        type: AUTHENTICATED,
        payload: { authenticated: true }
      });
    })
    .catch(err => {
      console.log("returned false");
      dispatch({
        type: AUTHENTICATED,
        payload: { authenticated: false }
      });
      console.log(err);
    });
};
