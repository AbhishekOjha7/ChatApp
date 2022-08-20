import { combineReducers } from "redux";
import authReducer from "./authentication/reducer";
import chatReducer from "./homeChat/reducer";
chatReducer
const rootReducer=combineReducers({
  authReducer,
  chatReducer
 })
 
 export default rootReducer