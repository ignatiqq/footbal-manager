import { call, put } from "redux-saga/effects";

import { getCompetitionsData } from "../../api";
import { getCompetitions } from "./competitions/competitionData";

describe("get data", () => {
    it("get competitions data", () => {
        const generator = getCompetitions();

        expect(generator.next().value).toEqual(put({type: "SET_COMPETITIONS_LOADING", payload: true}));

        expect(generator.next().value).toEqual(call(getCompetitionsData.getCompetitions));

        generator.next()

        expect(generator.next().value).toEqual(put({type: "SET_COMPETITIONS_LOADING", payload: false}));

    })
})