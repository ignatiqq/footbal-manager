
class getCompetitionsData {

    getCompetitions() {
        return fetch(`${process.env.REACT_APP_API_URL}/competitions`, {
            method: "GET",
            headers: {
                'X-Auth-Token': 'f9810a17836e4050840680fe63fa0f01'
            }
        })
    }

}

export default new getCompetitionsData();