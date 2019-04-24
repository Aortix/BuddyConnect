import {
  LOGIN,
  AUTHENTICATED,
  LOGOUT,
  USER_SIGNED_UP,
  ERROR,
  CLEAR_AUTH_ERRORS
} from "./../actions/types";

const initialState = {
  email: "",
  authenticated: false,
  userSignedUp: 0,
  errors: {}
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.payload
      };
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload === 1 ? true : false
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: action.payload
      };
    case USER_SIGNED_UP:
      return {
        ...state,
        userSignedUp: action.payload
      };
    case ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
};
