import { takeLatest, call, put } from "redux-saga/effects";

import type { IAction } from "../../interfaces/reducer";
import type { IApiRequestError } from "../../interfaces/api";
import type { ICompetitions } from "./interfaces";

import { getCompetitionsData } from "../../../api";
import { GET_CURRENT_COMPETITION } from "../actions";



function *getCurrentCompetition(action:IAction) {
    try {
        yield put({type: "SET_CURRENT_COMPETITION_LOADING", payload: true});

        const request: Response =  yield call(getCompetitionsData.getCompetitionById, action.payload);

        const data: ICompetitions | IApiRequestError  = yield request.json();

        if("error" in data || "errorCode" in data) {
            throw new Error(`Произошла ошибка ${data.error ? data.error : data.errorCode}: ${data.message}`);
        }

        yield put({type: "SET_CURRENT_COMPETITION", payload: data});
        yield put({type: "SET_CURRENT_COMPETITION_LOADING", payload: false});
   
    } catch (error: any) {
        yield put({type: "SET_CURRENT_COMPETITION_ERROR", payload: error.message});
        yield put({type: "SET_CURRENT_COMPETITION_LOADING", payload: false});
    }
}

export function *getCurrentCompetitionWatcher() {
    yield takeLatest(GET_CURRENT_COMPETITION, getCurrentCompetition)
}