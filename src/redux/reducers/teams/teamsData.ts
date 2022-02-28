import type { Reducer } from "redux";

import type { IAction } from "../../interfaces/globalInterfaces";
import type { ITeamsData } from "./teamsDataInterfaces";

import { 
    SET_TEAMS_DATA, 
    SET_TEAMS_LOADING, 
    SET_TEAMS_ERROR, 
    SET_TEAMS_PAGE,
    SET_CURRENT_TEAM,
    SET_CURRENT_TEAM_ERROR,
    SET_CURRENT_TEAM_LOADING,
    SET_CURRENT_TEAM_PAGE,
    SET_TEAM_BY_ID,
    SET_TEAM_BY_ID_LOADING,
    SET_TEAM_BY_ID_ERROR,
    CLEAR_CURRENT_TEAM,
    CLEAR_TEAM_BY_ID
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
    currentTeamMatches: {
        data: null,
        pagination: {
            page: 1,
            limit: 7
        },
        isLoading: false,
        error: {
            message: ""
        }
    },
    teamById: {
        data: null,
        isLoading: false,
        error: {
            message: ""
        }
    }
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

        case SET_CURRENT_TEAM: {
            return {
                ...state,
                currentTeamMatches: {
                    ...state.currentTeamMatches,
                    data: action.payload,
                    isLoading: false,
                    error: {
                        message: ""
                    }
                }
            }
        }

        case SET_CURRENT_TEAM_LOADING: {
            return {
                ...state,
                currentTeamMatches: {
                    ...state.currentTeamMatches,
                    isLoading: action.payload
                }
            }
        }   

        case SET_CURRENT_TEAM_ERROR: {
            return {
                ...state,
                currentTeamMatches: {
                    ...state.currentTeamMatches,
                    error: {
                        message: action.payload
                    },
                    isLoading: false
                }
            }
        }

        case SET_CURRENT_TEAM_PAGE: {
            return {
                ...state,
                currentTeamMatches: {
                    ...state.currentTeamMatches,
                    pagination: {
                        ...state.currentTeamMatches.pagination,
                        page: action.payload
                    }
                }
            }
        }

        case CLEAR_CURRENT_TEAM: {
            return {
                ...state,
                currentTeamMatches: {
                    ...state.currentTeamMatches,
                    data: null,
                    pagination: {
                        ...state.currentTeamMatches.pagination,
                        page: 1
                    },
                    isLoading: false,
                    error: {
                        message: ""
                    }
                }
            }
        }

        case SET_TEAM_BY_ID: {
            return {
                ...state,
                teamById: {
                    data: action.payload,
                    isLoading: false,
                    error: {
                        message: ""
                    }
                },
            }
        }

        case SET_TEAM_BY_ID_LOADING: {
            return {
                ...state,
                teamById: {
                    ...state.teamById,
                    isLoading: action.payload
                }
            }
        }

        case SET_TEAM_BY_ID_ERROR: {
            return {
                ...state,
                teamById: {
                    ...state.teamById,
                    isLoading: false,
                    error: {
                        message: action.payload
                    }
                }
            }
        }

        case CLEAR_TEAM_BY_ID: {
            return {
                ...state,
                teamById: {
                    ...state.teamById,
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

export default teamsData;