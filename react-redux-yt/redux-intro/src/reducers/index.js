import counterReducer from "./counter";
import loggedReducer from "./is_logged";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
});

export default allReducers;
