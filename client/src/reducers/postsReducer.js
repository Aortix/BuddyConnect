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
  COMMENT_DELETED,
  UPDATE_POSTS_TO_SEE,
  NEW_POSTS,
  RECEIVING_POSTS,
  ADD_POST_ID_TO_HIDE_COMMENTS,
  REMOVE_POST_ID_TO_SHOW_COMMENTS
} from "./../actions/types";

const initialState = {
  allPosts: null,
  friendsPosts: null,
  profilePosts: null,
  currentPost: "",
  //0 = user and friends posts, 1 = global posts
  postsToSee: 0,
  postErrors: {},
  commentErrors: {},
  postCreated: 0,
  postDeleted: 0,
  commentDeleted: 0,
  newPosts: 0,
  receivingPosts: 0,
  postIdsToHideComments: []
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
    case UPDATE_POSTS_TO_SEE:
      return {
        ...state,
        postsToSee: action.payload
      };
    case NEW_POSTS:
      return {
        ...state,
        newPosts: action.payload
      };
    case RECEIVING_POSTS:
      return {
        ...state,
        receivingPosts: action.payload
      };
    case ADD_POST_ID_TO_HIDE_COMMENTS:
      return {
        ...state,
        postIdsToHideComments: [...state.postIdsToHideComments, action.payload]
      };
    case REMOVE_POST_ID_TO_SHOW_COMMENTS:
      return {
        ...state,
        postIdsToHideComments: state.postIdsToHideComments.filter((id) => {
          return action.payload !== id;
        })
      }
    default:
      return state;
  }
};
