const requestConfig = (url: string) => {
    return fetch(url, {
        method: "GET",
        headers: {
            'X-Auth-Token': `${process.env.REACT_APP_API_TOKEN}`
        }
    })
}

export default requestConfig;