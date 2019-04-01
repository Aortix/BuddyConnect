import axios from "axios";
import { LOGIN_INFORMATION } from "./types";

export const authLogin = (email, password) => dispatch => {
  const requestBody = {
    email: email,
    password: password
  };
  axios
    .post("http://localhost:5000/api/user/login", requestBody)
    .then(data => {
      console.log(data);
      /*dispatch({
        type: LOGIN_INFORMATION,
        payload: {
          email,
          password,
          token: data.data.token
        }
      });*/
      window.localStorage.setItem("token", data.data.token);
    })
    .catch(err => {
      return err;
    });
};

export default authLogin;
