import type { Reducer } from "redux";

import type { IAction } from "../../interfaces/globalInterfaces";
import type { ITeamsData } from "./teamsDataInterfaces";

import { 
    SET_TEAMS_DATA, 
    SET_TEAMS_LOADING, 
    SET_TEAMS_ERROR, 
    SET_TEAMS_PAGE 
} from "../../actions/teams/actionNames";

const initialState = {
    teams: {
        data: null,
        pagination: {
            page: 1,
            limit: 10
        },
        isLoading: false,
        error: {
            message: ""
        }
    },
}

const teamsData: Reducer<ITeamsData, IAction> = (state = initialState, action): ITeamsData => {
    switch (action.type) {

        case SET_TEAMS_DATA: {
            return {
                ...state,
                teams: {
                    ...state.teams,
                    data: action.payload,
                    isLoading: false,
                    error: {
                        message: ""
                    }
                }
            }
        }
        
        case SET_TEAMS_LOADING: {
            return {
                ...state,
                teams: {
                    ...state.teams,
                    isLoading: action.payload
                }
            }
        }   

        case SET_TEAMS_ERROR: {
            return {
                ...state,
                teams: {
                    ...state.teams,
                    error: {
                        message: action.payload
                    },
                    isLoading: false
                }
            }
        }

        case SET_TEAMS_PAGE: {
            return {
                ...state,
                teams: {
                    ...state.teams,
                    pagination: {
                        ...state.teams.pagination,
                        page: action.payload
                    }
                }
            }
        }

        default: return state
    }
}

export default teamsData;