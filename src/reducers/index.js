import { combineReducers } from "redux";
// internal imports
import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import serviceRatingReducer from "./serviceRatingReducer";
import serviceReducer from "./serviceReducer";
import skillTestReducer from "./skillTestReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  services: serviceReducer,
  serviceRatings: serviceRatingReducer,
  jobs: jobReducer,
  skillTest: skillTestReducer,
});

export default rootReducer;
