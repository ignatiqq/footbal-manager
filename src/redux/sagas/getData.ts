import { takeLatest, call, put } from "redux-saga/effects";

import type { IApiRequestError } from "../interfaces/api";
import { getCompetitionsData } from "../../api/index";

export interface ICompetitions {
    data: any;
    competitions: Array<ICompetitionOne>,
    count: number,
    filters: object
}

export interface ICompetitionOne {
    area: {id: number, name: string, countryCode: string, ensignUrl: null | string}
    code: string
    currentSeason: {id: number, startDate: string, endDate: string, currentMatchday: number, winner: null | string}
    emblemUrl: null | string
    id: number
    lastUpdated: string
    name: string
    numberOfAvailableSeasons: 2
    plan: string
}

function *getCompetitions() {
    try {
        yield put({type: "SET_COMPETITIONS_LOADING", payload: true});

        const competitions: Response = yield call(getCompetitionsData.getCompetitions);

        const data: IApiRequestError | ICompetitions = yield competitions.json();

        if("error" in data) {
            throw new Error(`Произошла ошибка ${data.error}: ${data.message}`)
        }

        yield put({type: "SET_COMPETITIONS", payload: data})
        yield put({type: "SET_COMPETITIONS_LOADING", payload: false});

    } catch (error: any) {
        yield put({type: "SET_COMPETITIONS_ERROR", payload: {message: error.message}})
        yield put({type: "SET_COMPETITIONS_LOADING", payload: false})
    }
}

export function *getDataWatcher() {
    yield takeLatest("GET_COMPETITIONS_DATA", getCompetitions);
}