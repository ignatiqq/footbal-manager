import { SET_THEME } from "./actionNames"

export const changeTheme = (data:string) => ({
    type: SET_THEME,
    payload: data
})