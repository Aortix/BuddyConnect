import { GET_GLOBAL_POSTS } from "./../actions/types";

const initialState = {
  global_posts: null,
  friends_posts: null,
  profile_posts: null
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_POSTS:
      return {
        ...state,
        global_posts: action.payload
      };
    default:
      return state;
  }
};
