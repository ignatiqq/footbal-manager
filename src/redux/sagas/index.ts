import { all } from "redux-saga/effects";

import { themeWatcher } from "./globalSettings";
import { getCompetitionDataWatcher } from "./competitions/competitionData";
import { getCurrentCompetitionWatcher } from "./competitions/currentCompetitionData";
import { getTeamsDataWatcher } from "./teams/teamsData";
import { currentTeamWatcher } from "./teams/currentTeam";

export default function* rootSaga() {
    yield all([
        themeWatcher(),
        getCompetitionDataWatcher(),
        getCurrentCompetitionWatcher(),
        getTeamsDataWatcher(),
        currentTeamWatcher()
    ])
}