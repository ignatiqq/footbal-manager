export const setCompetitons = (data: Array<object>) => ({
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