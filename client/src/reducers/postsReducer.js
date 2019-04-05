import { GET_GLOBAL_POSTS } from "./../actions/types";

const initialState = {
  all_posts: null,
  friends_posts: null,
  my_posts: null
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_POSTS:
      return {
        ...state,
        all_posts: action.payload
      };
    default:
      return state;
  }
};
