import { ICompetitions, ICompetitionOne } from "../../reducers/competitions/competitionsDataInterfaces"
import {
    CLEAR_CURRENT_COMPETITION,
    SET_COMPETITIONS,
    SET_COMPETITIONS_LOADING,
    SET_COMPETITIONS_ERROR,
    SET_CURRENT_COMPETITION,
    SET_CURRENT_COMPETITION_ERROR,
    SET_CURRENT_COMPETITION_LOADING,
} from "./actionNames"

// ALL COMPETITIONS

export const setCompetitons = (data: ICompetitions) => ({
    type: SET_COMPETITIONS,
    payload: data
})

export const setCompetitionsLoading = (data: boolean) => ({
    type: SET_COMPETITIONS_LOADING,
    payload: data
})

export const setCompetitionsError = (data: string) => ({
    tpe: SET_COMPETITIONS_ERROR,
    payload: data
})
// COMPETITION BY ID

export const setCurrentCompetition = (data: ICompetitionOne) => ({
    type: SET_CURRENT_COMPETITION,
    payload: data
})

export const setCurrentCompetitionError = (data: string) => ({
    type: SET_CURRENT_COMPETITION_ERROR,
    payload: data
})

export const setCurrentCompetitionLoading = (data: boolean) => ({
    type: SET_CURRENT_COMPETITION_LOADING,
    payload: data
})

export const deleteCurrentCompetition = () => ({
    type: CLEAR_CURRENT_COMPETITION
})