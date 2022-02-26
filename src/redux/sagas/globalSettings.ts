import { select, put, takeEvery } from "redux-saga/effects";

import { CHANGE_THEME, SET_THEME } from "../actions/actionNames"

function* changeTheme() {
    const theme: string = yield select((state) => state.globalSettings.theme)

    yield put({type: SET_THEME, payload: theme === "dark" ? "light" : "dark"})
}

export function* themeWatcher() {
    yield takeEvery(CHANGE_THEME, changeTheme);
}