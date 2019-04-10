import { GET_PROFILE, GET_MY_PROFILE } from "./../actions/types";

const initialState = {
  my_profile: null,
  current_profile: null,
  profile_data: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        current_profile: action.payload.current_profile,
        profile_data: action.payload.profile_data
      };
    case GET_MY_PROFILE:
      return {
        ...state,
        my_profile: action.payload
      };
    default:
      return state;
  }
};
