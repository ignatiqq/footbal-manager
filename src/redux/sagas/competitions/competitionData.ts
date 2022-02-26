import { takeLatest, call, put } from "redux-saga/effects";

import type { IApiRequestError } from "../../interfaces/api";
import type { IAction } from "../../interfaces/reducer";
import type { ICompetitions } from "./interfaces";

import { getCompetitionsData } from "../../../api/index";
import { 
    GET_COMPETITIONS_DATA,
    CHANGE_COMPETITIONS_PAGE,
    SET_COMPETITIONS, 
    SET_COMPETITIONS_ERROR, 
    SET_COMPETITIONS_LOADING, 
    SET_COMPETITIONS_PAGE 
} from "../../actions/actionNames";

export function *getCompetitions() {
    try {
        yield put({type: SET_COMPETITIONS_LOADING, payload: true});

        const response: Response = yield call(getCompetitionsData.getCompetitions);

        const data: IApiRequestError | ICompetitions = yield call([response, response.json]);

        if("error" in data) {
            throw new Error(`Произошла ошибка ${data.error}: ${data.message}`)
        }

        yield put({type: SET_COMPETITIONS, payload: data})
        yield put({ type: SET_COMPETITIONS_LOADING, payload: false });

    } catch (error: any) {
        yield put({type: SET_COMPETITIONS_ERROR, payload: error.message})
        yield put({type: SET_COMPETITIONS_LOADING, payload: false})
    }
}

function *competitionsPagination(action: IAction) {
    yield put({type: SET_COMPETITIONS_PAGE, payload: action.payload})
}   

export function *getCompetitionDataWatcher() {
    yield takeLatest(GET_COMPETITIONS_DATA, getCompetitions);
    yield takeLatest(CHANGE_COMPETITIONS_PAGE, competitionsPagination);
}