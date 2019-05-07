import {
  GET_AND_STORE_A_PROFILE,
  GET_AND_STORE_MY_PROFILE,
  GET_FRIEND_THUMBNAIL,
  ADD_FRIEND,
  CHECK_FOR_FRIEND,
  REVERSE_ADDED_FRIEND,
  PROFILE_ERRORS,
  CLEAR_PROFILE_ERRORS,
  ABOUT_ME_UPDATED,
  CLEAR_ABOUT_ME_UPDATED,
  INTERESTS_UPDATED,
  CLEAR_INTERESTS_UPDATED,
  CURRENT_TAB,
  CURRENT_COMPONENT,
  AVATAR_UPLOADING
} from "./../actions/types";

const initialState = {
  myProfile: null,
  currentProfile: null,
  currentProfileData: null,
  friendThumbnails: null,
  isAFriend: 0,
  addedFriend: 0,
  profileErrors: {},
  aboutMeUpdated: 0,
  interestsUpdated: 0,
  // 0 = Posts, 1 = About Me, 2 = Interests, 3 = Friends, 4 = All tabs at once
  currentTab: 0,
  currentComponent: 0,
  avatarUploading: 0
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
        addedFriend: action.payload
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
    case ABOUT_ME_UPDATED:
      return {
        ...state,
        aboutMeUpdated: action.payload
      };
    case CLEAR_ABOUT_ME_UPDATED:
      return {
        ...state,
        aboutMeUpdated: action.payload
      };
    case INTERESTS_UPDATED:
      return {
        ...state,
        interestsUpdated: action.payload
      };
    case CLEAR_INTERESTS_UPDATED:
      return {
        ...state,
        interestsUpdated: action.payload
      };
    case CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
    case CURRENT_COMPONENT:
      return {
        ...state,
        currentComponent: action.payload
      };
    case AVATAR_UPLOADING:
      return {
        ...state,
        avatarUploading: action.payload
      };
    default:
      return state;
  }
};
