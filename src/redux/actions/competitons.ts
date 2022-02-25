import { ICompetitions, ICompetitionOne } from "../sagas/fetchData/interfaces"

// ALL COMPETITIONS

export const setCompetitons = (data: ICompetitions) => ({
    type: "SET_COMPETITIONS",
    payload: data
})

export const setCompetitionsLoading = (data: boolean) => ({
    type: "SET_COMPETITIONS_LOADING",
    payload: data
})

export const setCompetitionsError = (data: string) => ({
    tpe: "SET_COMPETITIONS_ERROR",
    payload: data
})

export const changePageCompetitions = (page: number) => ({
    type: "SET_COMPETITIONS_PAGE",
    payload: page
})

// COMPETITION BY ID

export const setCurrentCompetition = (data: ICompetitionOne) => ({
    type: "SET_CURRENT_COMPETITION",
    payload: data
})

export const setCurrentCompetitionError = (data: string) => ({
    type: "SET_CURRENT_COMPETITION_ERROR",
    payload: data
})

export const setCurrentCompetitionLoading = (data: boolean) => ({
    type: "SET_CURRENT_COMPETITION_LOADING",
    payload: data
})