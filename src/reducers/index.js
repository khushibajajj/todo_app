import CartReducer from "./reducers";
import LoginReducer from "./loginReducer";
import { combineReducers } from "redux";

export default combineReducers({
  CartReducer,
  LoginReducer,
});
