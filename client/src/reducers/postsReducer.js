import {
  GET_ALL_POSTS,
  GET_FRIENDS_POSTS,
  GET_PROFILE_POSTS,
  CHANGE_CURRENT_FOCUSED_POST,
  POST_ERRORS,
  COMMENT_ERRORS,
  CLEAR_POST_ERRORS,
  CLEAR_COMMENT_ERRORS
} from "./../actions/types";

const initialState = {
  allPosts: null,
  friendsPosts: null,
  profilePosts: null,
  currentPost: "",
  postErrors: {},
  commentErrors: {}
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
    case POST_ERRORS:
      return {
        ...state,
        postErrors: action.payload
      };
    case COMMENT_ERRORS:
      return {
        ...state,
        commentErrors: action.payload
      };
    case CLEAR_POST_ERRORS:
      return {
        ...state,
        postErrors: {}
      };
    case CLEAR_COMMENT_ERRORS:
      return {
        ...state,
        commentErrors: {}
      };
    default:
      return state;
  }
};
