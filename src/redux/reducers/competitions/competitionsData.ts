import type { Reducer } from "redux";

import type { IAction } from "../../interfaces/globalInterfaces";
import type { ICompetitionsData } from "./competitionsDataInterfaces";

import { 
    SET_COMPETITIONS,
    SET_COMPETITIONS_LOADING,
    SET_COMPETITIONS_ERROR,
    SET_CURRENT_COMPETITION,
    SET_CURRENT_COMPETITION_LOADING,
    SET_CURRENT_COMPETITION_ERROR,
    CLEAR_CURRENT_COMPETITION,
} from "../../actions/competitions/actionNames";

const initialState = {
    competitions: {
        data: null,
        isLoading: false,
        error: {
            message: ""
        }
    },
    currentCompetition: {
        data: null,
        isLoading: false,
        error: {
            message: ""
        }
    }
}

const competitionsData: Reducer<ICompetitionsData,IAction> = (state = initialState, action): ICompetitionsData => {
    switch (action.type) {
    
        case SET_COMPETITIONS: {
            return {
                ...state,
                competitions: {
                    ...state.competitions,
                    data: action.payload,
                    error: {
                        message: ""
                    }
                }
            }
        }

        case SET_COMPETITIONS_LOADING: {
            return {
                ...state,
                competitions: {
                    ...state.competitions,
                    isLoading: action.payload
                }
            }
        }

        case SET_COMPETITIONS_ERROR: {
            return {
                ...state,
                competitions: {
                    ...state.competitions,
                    error: {
                        message: action.payload
                    }
                }
            }
        }

        case SET_CURRENT_COMPETITION: {
            return {
                ...state,
                currentCompetition: {
                    ...state.currentCompetition,
                    data: action.payload,
                    error: {
                        message: ""
                    }
                }
            }
        }

        case SET_CURRENT_COMPETITION_LOADING: {
            return {
                ...state,
                currentCompetition: {
                    ...state.currentCompetition,
                    isLoading: action.payload
                }
            }
        }

        case SET_CURRENT_COMPETITION_ERROR: {
            return {
                ...state,
                currentCompetition: {
                    ...state.currentCompetition,
                    error: {
                        message: action.payload
                    }
                }
            }
        }

        case CLEAR_CURRENT_COMPETITION: {
            return {
                ...state,
                currentCompetition: {
                    ...state.currentCompetition,
                    data: null,
                    isLoading: false,
                    error: {
                        message: ""
                    }
                }
            }
        }

        default: return state
    }
}

export default competitionsData;