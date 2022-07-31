import todoReducer from "./TodoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  todoReducer,
});

export default rootReducer;
