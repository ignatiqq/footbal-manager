import { takeLatest, call, put } from "redux-saga/effects";

import type { IApiRequestError } from "../../interfaces/api";
import type { ICompetitions } from "./interfaces";

import { getCompetitionsData } from "../../../api/index";
import { GET_COMPETITIONS_DATA } from "../actions";

export function *getCompetitions() {
    try {
        yield put({type: "SET_COMPETITIONS_LOADING", payload: true});

        const request: Response = yield call(getCompetitionsData.getCompetitions);

        const data: IApiRequestError | ICompetitions = yield request.json();

        if("error" in data) {
            throw new Error(`Произошла ошибка ${data.error}: ${data.message}`)
        }

        yield put({type: "SET_COMPETITIONS", payload: data})
        yield put({type: "SET_COMPETITIONS_LOADING", payload: false});

    } catch (error: any) {
        yield put({type: "SET_COMPETITIONS_ERROR", payload: error.message})
        yield put({type: "SET_COMPETITIONS_LOADING", payload: false})
    }
}

export function *getCompetitionDataWatcher() {
    yield takeLatest(GET_COMPETITIONS_DATA, getCompetitions);
}