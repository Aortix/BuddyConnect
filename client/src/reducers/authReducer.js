import { LOGIN_INFORMATION, AUTHENTICATED, LOGOUT } from "./../actions/types";

const initialState = {
  email: "",
  authenticated: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INFORMATION:
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
    default:
      return state;
  }
};
