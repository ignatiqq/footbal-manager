import requestConfig from "../requestConfig";

interface GetTeamById {
    id: string,
    dateFrom?: string,
    dateTo?:string
}

class getTeamsData {

    async getTeams(): Promise<Response> {
        return requestConfig(`${process.env.REACT_APP_API_URL}/teams`)
    }

    async getCurrentTeamMatches(data: GetTeamById): Promise<Response> {
        return requestConfig(`${process.env.REACT_APP_API_URL}/teams/${data.id}/matches?dateFrom=${data && data.dateFrom ? data.dateFrom : ""}&dateTo=${data && data.dateTo ? data.dateTo : ""}`)
    }

    async getTeamById(id: number) {
        return requestConfig(`${process.env.REACT_APP_API_URL}/teams/${id}`)
    }

}

export default new getTeamsData();