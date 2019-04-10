import { combineReducers } from "redux";

//Reducers
import { authReducer } from "./authReducer";
import { postsReducer } from "./postsReducer";
import { profileReducer } from "./profileReducer";

export default combineReducers({ authReducer, postsReducer, profileReducer });
