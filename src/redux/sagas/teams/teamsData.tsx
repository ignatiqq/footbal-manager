import { put, call, takeLatest, takeEvery } from "redux-saga/effects";

import { 
    GET_TEAMS_DATA, 
    SET_TEAMS_LOADING, 
    SET_TEAMS_DATA, 
    SET_TEAMS_ERROR, 
    CHANGE_TEAMS_PAGE,
    SET_TEAMS_PAGE
} from "../../actions/teams/actionNames";
import type { IAction, IApiRequestError } from "../../interfaces/globalInterfaces";
import getTeamsData from "../../../api/routes/getTeamsData";

export function *getTeams() {
    try {
        yield put({type: SET_TEAMS_LOADING, payload: true})

        const response: Response = yield call(getTeamsData.getTeams);

        const data: IApiRequestError = yield call([response, response.json]);

        if("error" in data || "errorCode" in data) {
            throw new Error(`Произошла ошибка ${data.error ? data.error : data.errorCode}: ${data.message}`);
        }
        
        yield put({type: SET_TEAMS_DATA, payload: data});
        yield put({type: SET_TEAMS_LOADING, payload: false});
    } catch (error: any) {
        yield put({type: SET_TEAMS_ERROR, payload: error.message});
        yield put({type: SET_TEAMS_LOADING, payload: false});
    }
}

function *changeTeamsPage(action:IAction) {
    yield put({type: SET_TEAMS_PAGE, payload: action.payload})
}

export function *getTeamsDataWatcher() {
    yield takeLatest(GET_TEAMS_DATA, getTeams)
    yield takeEvery(CHANGE_TEAMS_PAGE, changeTeamsPage)
}