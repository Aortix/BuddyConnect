import {
  GET_AND_STORE_A_PROFILE,
  GET_AND_STORE_MY_PROFILE,
  GET_FRIEND_THUMBNAIL,
  ADD_FRIEND,
  CHECK_FOR_FRIEND,
  REVERSE_ADDED_FRIEND,
  PROFILE_ERRORS,
  CLEAR_PROFILE_ERRORS
} from "./../actions/types";

const initialState = {
  myProfile: null,
  currentProfile: null,
  currentProfileData: null,
  friendThumbnails: null,
  isAFriend: 0,
  addedFriend: 0,
  profileErrors: {}
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
        currentProfile: action.payload._id,
        currentProfileData: action.payload,
        myProfile: action.payload._id
      };
    case GET_FRIEND_THUMBNAIL:
      return {
        ...state,
        friendThumbnails: action.payload
      };
    case ADD_FRIEND:
      return {
        ...state,
        isAFriend: action.payload,
        addedFriend: 1
      };
    case CHECK_FOR_FRIEND:
      return {
        ...state,
        isAFriend: action.payload
      };
    case REVERSE_ADDED_FRIEND:
      return {
        ...state,
        addedFriend: 0
      };
    case PROFILE_ERRORS:
      return {
        ...state,
        profileErrors: action.payload
      };
    case CLEAR_PROFILE_ERRORS:
      return {
        ...state,
        profileErrors: {}
      };
    default:
      return state;
  }
};
