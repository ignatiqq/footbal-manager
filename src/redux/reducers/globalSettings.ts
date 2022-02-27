import type { IAction } from "../interfaces/globalInterfaces";
import type { Reducer } from "redux";

export interface IGlobalSettings {
    theme: string | null
}

const initialState = {
    theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
}

const globalSettings: Reducer<IGlobalSettings, IAction> = (state = initialState, action): IGlobalSettings => {
    switch (action.type) {

        case "SET_THEME": {
            return {    
                ...state,
                theme: action.payload
            }
        }
    
        default: return state;
    }
}

export default globalSettings;