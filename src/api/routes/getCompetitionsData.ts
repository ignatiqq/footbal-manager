import requestConfig from "../requestConfig";

class getCompetitionsData {

    getCompetitions(): Promise<Response> {
        return requestConfig(`${process.env.REACT_APP_API_URL}/competitions`)
    }

    getCompetitionById(id: number): Promise<Response> {
        return requestConfig(`${process.env.REACT_APP_API_URL}/competitions/${id}/matches`)
    }

}

export default new getCompetitionsData();