import {
  SETTINGS_ERRORS,
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  DELETE_ACCOUNT_CHANGED,
  CLEAR_NAME_CHANGED,
  CLEAR_EMAIL_CHANGED,
  CLEAR_PASSWORD_CHANGED,
  CLEAR_ACCOUNT_DELETED_CHANGED
} from "./../actions/types";

const initialState = {
  settingsErrors: {},
  nameChanged: 0,
  emailChanged: 0,
  passwordChanged: 0,
  deleteAccountChanged: 0
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_ERRORS:
      return {
        ...state,
        settingsErrors: action.payload
      };
    case NAME_CHANGED:
      return {
        ...state,
        nameChanged: action.payload
      };
    case EMAIL_CHANGED:
      return {
        ...state,
        emailChanged: action.payload
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        passwordChanged: action.payload
      };
    case DELETE_ACCOUNT_CHANGED:
      return {
        ...state,
        deleteAccountChanged: action.payload
      };
    case CLEAR_NAME_CHANGED:
      return {
        ...state,
        nameChanged: action.payload
      };
    case CLEAR_EMAIL_CHANGED:
      return {
        ...state,
        emailChanged: action.payload
      };
    case CLEAR_PASSWORD_CHANGED:
      return {
        ...state,
        passwordChanged: action.payload
      };
    case CLEAR_ACCOUNT_DELETED_CHANGED:
      return {
        ...state,
        deleteAccountChanged: action.payload
      };
    default:
      return state;
  }
};
