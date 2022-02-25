import { combineReducers } from "redux";

import globalSettings from "./globalSettings";
import footbalData from "./footbalData";

const rootReducer = combineReducers({
    globalSettings,
    footbalData,
})

export default rootReducer;