import type { IPagination } from "../../interfaces/globalInterfaces";

export interface ITeamsData {
    readonly teams: {
        readonly data: ITeams | null,
        pagination: IPagination,
        isLoading: boolean,
        error: {
            message: string
        },
    }
}

export interface ITeams {
    count: number,
    filters: {
        areas: Array<number>,
        permission: string
    },
    teams: Array<ITeamOne> 
}

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