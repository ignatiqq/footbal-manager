import { takeLatest, put, select } from "redux-saga/effects";
import type { IAction } from "../interfaces/reducer";

import { CHANGE_COMPETITIONS_PAGE } from "./actions";

function *competitionsPagination(action: IAction) {
    yield put({type: "SET_COMPETITIONS_PAGE", payload: action.payload})
}   

export function *competitionsPaginatorWatcher() {
    yield takeLatest(CHANGE_COMPETITIONS_PAGE, competitionsPagination);
}