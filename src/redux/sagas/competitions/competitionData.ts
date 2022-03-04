import { takeLatest, call, put } from "redux-saga/effects";

import type { IApiRequestError } from "../../interfaces/globalInterfaces";
import type { ICompetitions } from "../../reducers/competitions/competitionsDataInterfaces";

import { getCompetitionsData } from "../../../api/index";
import { 
    GET_COMPETITIONS_DATA,
    SET_COMPETITIONS, 
    SET_COMPETITIONS_ERROR, 
    SET_COMPETITIONS_LOADING, 
} from "../../actions/competitions/actionNames";    

export function *getCompetitions() {
    try {
        yield put({type: SET_COMPETITIONS_LOADING, payload: true});

        const response: Response = yield call(getCompetitionsData.getCompetitions);

        console.log(response)

        const data: IApiRequestError | ICompetitions = yield call([response, response.json]);

        if("error" in data || "errorCode" in data) {
            throw new Error(`Произошла ошибка ${data.error ? data.error : data.errorCode}: ${data.message}`);
        }

        yield put({type: SET_COMPETITIONS, payload: data})
        yield put({ type: SET_COMPETITIONS_LOADING, payload: false });

    } catch (error: any) {
        yield put({type: SET_COMPETITIONS_ERROR, payload: error.message})
        yield put({type: SET_COMPETITIONS_LOADING, payload: false})
    }
}


export function *getCompetitionDataWatcher() {
    yield takeLatest(GET_COMPETITIONS_DATA, getCompetitions);
}