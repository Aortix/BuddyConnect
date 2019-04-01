import { LOGIN_INFORMATION } from "./../actions/types";

const initialState = {
  email: "",
  password: "",
  token: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INFORMATION:
      return {
        email: action.payload.email,
        password: action.payload.password,
        token: action.payload.token
      };
    default:
      return state;
  }
};
