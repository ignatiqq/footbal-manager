import { combineReducers } from "redux";

import globalSettings from "./globalSettings";
import competitionsData from "./competitions/competitionsData";
import teamsData from "./teams/teamsData";

const rootReducer = combineReducers({
    globalSettings,
    competitionsData,
    teamsData
})

export default rootReducer;