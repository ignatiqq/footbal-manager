export const sliceData = <T>(data: T[], page: number, limit: number): T[] => {
    return data.slice((page - 1) * limit, limit * page);
}