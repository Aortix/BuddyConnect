import { LOGIN_INFORMATION, AUTHENTICATED } from "./../actions/types";

const initialState = {
  email: "",
  authenticated: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INFORMATION:
      return {
        ...state,
        email: action.payload.email
      };
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload.authenticated
      };
    default:
      return state;
  }
};
