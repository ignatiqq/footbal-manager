import type { IAction } from "../interfaces/reducer";
import type { Reducer } from "redux";
import type { ICompetitions } from "../sagas/getData";

interface IFootbalData {
    competitions: {
        data: ICompetitions | null,
        pagination: {
            page: number,
            limit: number
        },
        isLoading: boolean,
        error: {
            message: string
        } | null
    }
}

const initialState = {
    competitions: {
        data: null,
        pagination: {
            page: 1,
            limit: 9
        },
        isLoading: false,
        error: {
            message: ""
        }
    }
}

const footbalData: Reducer<IFootbalData,IAction> = (state = initialState, action): IFootbalData => {
    switch (action.type) {
    
        case "SET_COMPETITIONS": {
            return {
                ...state,
                competitions: {
                    ...state.competitions,
                    data: action.payload
                }
            }
        }

        case "SET_COMPETITIONS_LOADING": {
            return {
                ...state,
                competitions: {
                    ...state.competitions,
                    isLoading: action.payload
                }
            }
        }

        case "SET_COMPETITIONS_ERROR": {
            return {
                ...state,
                competitions: {
                    ...state.competitions,
                    error: action.payload
                }
            }
        }

        default: return state
    }
}

export default footbalData;