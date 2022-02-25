export interface ICompetitions {
    data: any;
    competitions: Array<ICompetitionOne>,
    count: number,
    filters: object
}

export interface ICompetitionOne {
    area: {id: number, name: string, countryCode: string, ensignUrl: null | string}
    code: string
    currentSeason: {id: number, startDate: string, endDate: string, currentMatchday: number, winner: null | string}
    emblemUrl: null | string
    id: number
    lastUpdated: string
    name: string
    numberOfAvailableSeasons: 2
    plan: string
}

// current competition interfaces

export interface ICurrentCompetitionMatch {
    id: number,
    season: {
        id: number,
        startDate: string,
        endDate:string,
        currentMatchday: number
    },
    utcDate: string,
    status: string,
    matchday: number,
    stage: string,
    group: string,
    lastUpdated: string,
    odds: any,
    score: {
        winner: string,
        duration: string
    },
    fullTime: any,
    halfTime: any,
    extraTime: any,
    penalties: any,
    homeTeam: {
        id: number,
        name: string
    },
    awayTeam: {
        id: number,
        name: string
    },
    referees: Array<any>
}

export interface ICurrentCompetition {
        count: number,
        filters: object,
        competition: {
            id: number,
            area: {
                id: number,
                name: string
            },
            name: string,
            code: string,
            plan: string,
            lastUpdated: string
        },
        matches: Array<ICurrentCompetitionMatch>
}