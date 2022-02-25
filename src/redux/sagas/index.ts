import { all } from "redux-saga/effects";

import { themeWatcher } from "./globalSettings";
import { getCompetitionDataWatcher } from "./fetchData/getCompetitionData";
import { getCurrentCompetitionWatcher } from "./fetchData/getCurrentCompetition";
import { competitionsPaginatorWatcher } from "./paginator";

export default function* rootSaga() {
    yield all([
        themeWatcher(),
        getCompetitionDataWatcher(),
        competitionsPaginatorWatcher(),
        getCurrentCompetitionWatcher()
    ])
}