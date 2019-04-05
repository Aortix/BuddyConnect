import { combineReducers } from "redux";

//Reducers
import { authReducer } from "./authReducer";
import { postsReducer } from "./postsReducer";

export default combineReducers({ authReducer, postsReducer });
