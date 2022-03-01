import { takeLatest, call, put, takeEvery } from "redux-saga/effects";

import type { IAction, IApiRequestError } from "../../interfaces/globalInterfaces";
import type { ICompetitions } from "../../reducers/competitions/competitionsDataInterfaces";

import { getCompetitionsData } from "../../../api";
import { 
    GET_CURRENT_COMPETITION, 
    SET_CURRENT_COMPETITION_LOADING,
    SET_CURRENT_COMPETITION,
    SET_CURRENT_COMPETITION_ERROR,
} from "../../actions/competitions/actionNames";

export function *getCurrentCompetitionData(action:IAction) {
    try {
        yield put({type: SET_CURRENT_COMPETITION_LOADING, payload: true});

        const response: Response =  yield call(getCompetitionsData.getCompetitionById, action.payload);

        const data: ICompetitions | IApiRequestError  = yield call([response, response.json]);

        if("error" in data || "errorCode" in data) {
            throw new Error(`Произошла ошибка ${data.error ? data.error : data.errorCode}: ${data.message}`);
        }

        yield put({type: SET_CURRENT_COMPETITION, payload: data});
        yield put({type: SET_CURRENT_COMPETITION_LOADING, payload: false});
   
    } catch (error: any) {
        yield put({type: SET_CURRENT_COMPETITION_ERROR, payload: error.message});
        yield put({type: SET_CURRENT_COMPETITION_LOADING, payload: false});
    }
}

export function *getCurrentCompetitionWatcher() {
    yield takeLatest(GET_CURRENT_COMPETITION, getCurrentCompetitionData);
}