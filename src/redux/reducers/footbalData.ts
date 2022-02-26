import type { IAction } from "../interfaces/reducer";
import type { Reducer } from "redux";
import type { ICompetitions, ICurrentCompetition } from "../sagas/competitions/interfaces";

interface IPagination {
    page: number,
    limit: number
}

interface IFootbalData {
    readonly competitions: {
        readonly data: ICompetitions | null,
        pagination: IPagination,
        isLoading: boolean,
        error: {
            message: string
        },
    },
    readonly currentCompetition: {
        readonly data: ICurrentCompetition | null,
        pagination: IPagination,
        isLoading: boolean,
        error: {
            message: string
        }
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
    },
    currentCompetition: {
        data: null,
        pagination: {
            page: 1,
            limit: 7
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
                    data: action.payload,
                    error: {
                        message: ""
                    }
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
                    error: {
                        message: action.payload
                    }
                }
            }
        }

        case "SET_COMPETITIONS_PAGE": {
            return {
                ...state,
                competitions: {
                    ...state.competitions,
                    pagination: {
                        ...state.competitions.pagination,
                        page: action.payload
                    }
                }
            }
        }

        case "SET_CURRENT_COMPETITION": {
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

        case "SET_CURRENT_COMPETITION_LOADING": {
            return {
                ...state,
                currentCompetition: {
                    ...state.currentCompetition,
                    isLoading: action.payload
                }
            }
        }

        case "SET_CURRENT_COMPETITION_ERROR": {
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

        case "CLEAR_CURRENT_COMPETITION": {
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

        case "SET_CURRENT_COMPETITION_PAGE": {
            return {
                ...state,
                currentCompetition: {
                    ...state.currentCompetition,
                    pagination: {
                        ...state.currentCompetition.pagination,
                        page: action.payload,
                    }
                }
            }
        }

        default: return state
    }
}

export default footbalData;