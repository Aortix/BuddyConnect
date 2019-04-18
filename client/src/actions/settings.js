import axios from "axios";

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
        console.log(data);
      })
      .catch(err => {
        console.log(err);
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
        { email: email, password: password2 },
        config
      )
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
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
        { password: password, password2: password2 },
        config
      )
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
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
        { password2: password2 },
        config
      )
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
