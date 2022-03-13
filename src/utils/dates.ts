export const getUTCDate = (date: number) => {
    return new Date(date - ((new Date().getTimezoneOffset()) * 60))
}

export const formatToLocalDateString = (date: string) => {
    return new Date(date).toLocaleDateString(navigator.language);
}

export const formatToLocalTimeString = (date: string) => {
    return new Date(date).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}

export const formatDateToRequest = (date: Date) => {
    return new Date(date).toISOString().split("T")[0];   
}