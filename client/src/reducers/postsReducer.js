import {
  GET_ALL_POSTS,
  GET_FRIENDS_POSTS,
  GET_PROFILE_POSTS,
  CHANGE_CURRENT_FOCUSED_POST,
  POST_ERRORS,
  COMMENT_ERRORS,
  CLEAR_POST_ERRORS,
  CLEAR_COMMENT_ERRORS,
  POST_CREATED,
  POST_DELETED,
  COMMENT_DELETED
} from "./../actions/types";

const initialState = {
  allPosts: null,
  friendsPosts: null,
  profilePosts: null,
  currentPost: "",
  postErrors: {},
  commentErrors: {},
  postCreated: 0,
  postDeleted: 0,
  commentDeleted: 0
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
    case POST_CREATED:
      return {
        ...state,
        postCreated: action.payload
      };
    case POST_DELETED:
      return {
        ...state,
        postDeleted: action.payload
      };
    case COMMENT_DELETED:
      return {
        ...state,
        commentDeleted: action.payload
      };
    default:
      return state;
  }
};
