import type { IMatchInfo } from "../competitions/competitionsDataInterfaces";

export interface ITeamsData {
    readonly teams: {
        readonly data: ITeams | null,
        isLoading: boolean,
        error: {
            message: string
        },
    },
    readonly currentTeamMatches: {
        readonly data: ICurrentTeam | null,
        isLoading: boolean,
        error: {
            message: string
        },
    },
    teamById: ITeamById
}

export interface ITeams {
    count: number,
    filters: {
        areas: Array<number>,
        permission: string
    },
    teams: Array<ITeamOne> 
}

export interface ICurrentTeam {
    count: number,
    filters: {
        permission: string,
        limit: number
    },
    matches: Array<IMatchInfo>
}



// current team

export interface ITeamOne {
    addres: string,
    area: {
        id: number,
        name: string
    },
    clubColors: string,
    crestUrl: string,
    email: string,
    founded: number,
    id: number,
    lastUpdated: string,
    name: string,
    phone: string,
    shortName: string,
    tla: string,
    venue: string,
    website: string
}

// TEAM BY ID

export interface ITeamById {
    data: null | ITeamByIdOne,
    isLoading: boolean,
    error: {
        message: string
    }
}

export interface ITeamByIdOne {
    id: number,
    area: {
        id: number,
        name: string
    },
    name: string,
    shortName: string,
    tla: string,
    crestUrl: string,
    address:string,
    phone: string,
    website: string,
    email: string,
    founded: number,
    clubColors: string,
    venue: string,
}