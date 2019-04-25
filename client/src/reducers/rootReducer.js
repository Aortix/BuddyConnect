import { combineReducers } from "redux";

//Reducers
import { authReducer } from "./authReducer";
import { postsReducer } from "./postsReducer";
import { profileReducer } from "./profileReducer";
import { settingsReducer } from "./settingsReducer";

export default combineReducers({
  authReducer,
  postsReducer,
  profileReducer,
  settingsReducer
});
