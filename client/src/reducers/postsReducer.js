import { GET_GLOBAL_POSTS, CHANGE_CURRENT_POST } from "./../actions/types";

const initialState = {
  global_posts: null,
  friends_posts: null,
  profile_posts: null,
  current_post: ""
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_POSTS:
      return {
        ...state,
        global_posts: action.payload
      };
    case CHANGE_CURRENT_POST:
      return {
        ...state,
        current_post: action.payload
      };
    default:
      return state;
  }
};
