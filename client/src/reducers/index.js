import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import list from "./list";

export default combineReducers({ alert, auth, list });
