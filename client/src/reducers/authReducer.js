import {
  LOGIN,
  AUTHENTICATED,
  LOGOUT,
  USER_SIGNED_UP,
  ERROR,
  CLEAR_AUTH_ERRORS,
  ATTEMPTS
} from "./../actions/types";

const initialState = {
  email: "",
  attempts: 0,
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
        authenticated: action.payload === 0 ? false : false
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
    case ATTEMPTS:
      return {
        ...state,
        attempts: action.payload === 0 ? 0 : state.attempts + action.payload
      };
    default:
      return state;
  }
};
