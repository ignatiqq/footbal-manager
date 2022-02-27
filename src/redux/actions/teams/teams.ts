import { 
    SET_TEAMS_DATA, 
    SET_TEAMS_LOADING, 
    SET_TEAMS_ERROR, 
    SET_TEAMS_PAGE 
} from "./actionNames";
import type { ITeams } from "../../reducers/teams/teamsDataInterfaces";

export const setTeamsData = (data: ITeams) => ({
    type: SET_TEAMS_DATA,
    payload: data
})

export const setTeamsLoading = (data: boolean) => ({
    type: SET_TEAMS_LOADING,
    payload: data
})

export const setTeamsError = (data: string) => ({
    type: SET_TEAMS_ERROR,
    payload: data
})

export const setTeamsPage = (data: number) => ({
    type: SET_TEAMS_PAGE,
    payload: data
})