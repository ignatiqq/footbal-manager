import requestConfig from "../requestConfig";

interface GetCompetitionById {
    id: string,
    dateFrom?: string,
    dateTo?:string
}

class getCompetitionsData {

    getCompetitions(): Promise<Response> {
        return requestConfig(`${process.env.REACT_APP_API_URL}/competitions`)
    }

    getCompetitionById(data: GetCompetitionById): Promise<Response> {
        return requestConfig(`${process.env.REACT_APP_API_URL}/competitions/${data.id}/matches?dateFrom=${data && data.dateFrom ? data.dateFrom : ""}&dateTo=${data && data.dateTo ? data.dateTo : ""}`)
    }

}

export default new getCompetitionsData();