import { all } from "redux-saga/effects";

import { themeWatcher } from "./globalSettings";
import { getDataWatcher } from "./getData";

export default function* rootSaga() {
    yield all([
        themeWatcher(),
        getDataWatcher()
    ])
}