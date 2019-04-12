import {
  GET_AND_STORE_A_PROFILE,
  GET_AND_STORE_MY_PROFILE,
  GET_FRIEND_THUMBNAIL
} from "./../actions/types";

const initialState = {
  myProfile: null,
  currentProfile: null,
  currentProfileData: null,
  friendThumbnails: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AND_STORE_A_PROFILE:
      return {
        ...state,
        currentProfile: action.payload.currentProfile,
        currentProfileData: action.payload.currentProfileData
      };
    case GET_AND_STORE_MY_PROFILE:
      return {
        ...state,
        myProfile: action.payload
      };
    case GET_FRIEND_THUMBNAIL:
      return {
        ...state,
        friendThumbnails: action.payload
      };
    default:
      return state;
  }
};
