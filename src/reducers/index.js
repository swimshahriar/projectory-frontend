import { combineReducers } from "redux";
// internal imports
import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import orderReducer from "./orderReducer";
import paymentReducer from "./paymentReducer";
import serviceRatingReducer from "./serviceRatingReducer";
import serviceReducer from "./serviceReducer";
import siteSettingReducer from "./siteSettingReducer";
import skillTestReducer from "./skillTestReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  services: serviceReducer,
  serviceRatings: serviceRatingReducer,
  jobs: jobReducer,
  skillTest: skillTestReducer,
  settings: siteSettingReducer,
  orders: orderReducer,
  payments: paymentReducer,
});

export default rootReducer;
