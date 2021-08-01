import { combineReducers } from "redux";
import authReducer from "./authReducer";
import serviceRatingReducer from "./serviceRatingReducer";
import serviceReducer from "./serviceReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  services: serviceReducer,
  serviceRatings: serviceRatingReducer,
});

export default rootReducer;
