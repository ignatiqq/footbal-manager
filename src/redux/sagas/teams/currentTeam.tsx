import { takeEvery, call, put, all } from "redux-saga/effects";

import type { IApiRequestError } from "../../interfaces/globalInterfaces";
import type { ITeams, ITeamByIdOne, ITeamById } from "../../reducers/teams/teamsDataInterfaces";
import type { IAction } from "../../interfaces/globalInterfaces";

import { 
    GET_CURRENT_TEAM_MATCHES,
    SET_CURRENT_TEAM_LOADING,
    SET_CURRENT_TEAM,
    SET_CURRENT_TEAM_ERROR,
    SET_TEAM_BY_ID,
    SET_TEAM_BY_ID_LOADING,
    SET_TEAM_BY_ID_ERROR
} from "../../actions/teams/actionNames";

import getTeamsData from "../../../api/routes/getTeamsData";

function *getTeamById(action:any) {
    try {
        yield put({type: SET_TEAM_BY_ID_LOADING, payload: true});

        const response: Response  = yield call(getTeamsData.getTeamById, action.payload.id);

        const data: ITeamByIdOne | IApiRequestError = yield call([response, response.json]);

        if("error" in data || "errorCode" in data) {
            throw new Error(`Произошла ошибка ${data.error ? data.error : data.errorCode}: ${data.message}`);
        }

        yield put({type: SET_TEAM_BY_ID, payload: data})
        yield put({type: SET_TEAM_BY_ID_LOADING, payload: false})
    } catch (error: any) {
        yield put({type: SET_TEAM_BY_ID_ERROR, payload: error.message})
        yield put({type: SET_TEAM_BY_ID_LOADING, payload: false});
    }
}

export function *getCurrentTeamMatches(action:IAction) {
    try {
        yield put({type: SET_CURRENT_TEAM_LOADING, payload: true});

        const response: Response = yield call(getTeamsData.getCurrentTeamMatches, action.payload);

        const data: ITeams | IApiRequestError  = yield call([response, response.json]);

        if("error" in data || "errorCode" in data) {
            throw new Error(`Произошла ошибка ${data.error ? data.error : data.errorCode}: ${data.message}`);
        }

        yield put({type: SET_CURRENT_TEAM, payload: data});
        yield put({type: SET_CURRENT_TEAM_LOADING, payload: false});

    } catch (error: any) {
        yield put({type: SET_CURRENT_TEAM_ERROR, payload: error.message});
        yield put({type: SET_CURRENT_TEAM_LOADING, payload: false});
    }
}

function *getTeamMatchesAndInfo(action:IAction) {
    try {   
        yield all([
            call(getCurrentTeamMatches, action),
            call(getTeamById, action)
        ])
    } catch (error) {
        
    }
}

export function *currentTeamWatcher() {
    yield takeEvery(GET_CURRENT_TEAM_MATCHES, getTeamMatchesAndInfo);
}