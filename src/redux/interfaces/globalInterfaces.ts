export interface IAction {
    type: string,
    payload?: any
}

export interface IApiRequestError {
    message: string,
    error?: number,
    errorCode?: number
}