import { combineReducers } from "redux";
import authReducer from "./authReducer";
import serviceReducer from "./serviceReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  services: serviceReducer,
});

export default rootReducer;
