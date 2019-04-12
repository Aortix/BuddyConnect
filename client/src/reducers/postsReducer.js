import {
  GET_ALL_POSTS,
  GET_FRIENDS_POSTS,
  GET_PROFILE_POSTS,
  CHANGE_CURRENT_FOCUSED_POST
} from "./../actions/types";

const initialState = {
  allPosts: null,
  friendsPosts: null,
  profilePosts: null,
  currentPost: ""
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload
      };
    case GET_FRIENDS_POSTS:
      return {
        ...state,
        friendsPosts: action.payload
      };
    case GET_PROFILE_POSTS:
      return {
        ...state,
        profilePosts: action.payload
      };
    case CHANGE_CURRENT_FOCUSED_POST:
      return {
        ...state,
        currentPost: action.payload
      };
    default:
      return state;
  }
};
