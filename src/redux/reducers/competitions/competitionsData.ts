import type { Reducer } from "redux";

import type { IAction } from "../../interfaces/globalInterfaces";
import type { ICompetitionsData } from "./competitionsDataInterfaces";

import { 
    SET_COMPETITIONS,
    SET_COMPETITIONS_LOADING,
    SET_COMPETITIONS_ERROR,
    SET_COMPETITIONS_PAGE,
    SET_CURRENT_COMPETITION,
    SET_CURRENT_COMPETITION_LOADING,
    SET_CURRENT_COMPETITION_ERROR,
    CLEAR_CURRENT_COMPETITION,
    SET_CURRENT_COMPETITION_PAGE,
    SEARCH_COMPETITIONS
} from "../../actions/competitions/actionNames";

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

        case SET_COMPETITIONS_PAGE: {
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

        case SEARCH_COMPETITIONS: {

            let filtered: any = [];

            if(state.competitions.data && state.competitions.data.competitions) {
                filtered = state.competitions.data?.competitions.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
            }

                return {
                    ...state,
                    competitions: {
                        ...state.competitions,
                        data: {
                            ...state.competitions.data,
                            competitions: filtered,
                            count: filtered.length,
                            filters: action.payload
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

        case SET_CURRENT_COMPETITION_PAGE: {
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

export default competitionsData;