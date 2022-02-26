import { call, put } from "redux-saga/effects";

import { getCompetitionsData } from "../../../api";
import { getCurrentCompetition } from "./currentCompetitionData";

describe("get currentcompetition data", () => {
    it("get currnet competition succes", () => {
        
        const generator = getCurrentCompetition();

        expect(generator.next().value).toEqual(put({type: "SET_CURRENT_COMPETITION_LOADING", payload: true}));

        const payload = 1;

        expect(generator.next(payload).value).toEqual(call(getCompetitionsData.getCompetitionById, 1))

    })
})