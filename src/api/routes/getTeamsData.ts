import requestConfig from "../requestConfig";

class getTeamsData {

    async getTeams() {
        return requestConfig(`${process.env.REACT_APP_API_URL}/teams`)
    }

}

export default new getTeamsData();