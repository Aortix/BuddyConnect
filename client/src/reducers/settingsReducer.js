import { SETTINGS_ERRORS } from "./../actions/types";

const initialState = {
  settingsErrors: {}
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_ERRORS:
      return {
        ...state,
        settingsErrors: action.payload
      };
    default:
      return state;
  }
};
