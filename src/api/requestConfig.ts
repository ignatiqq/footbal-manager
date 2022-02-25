const requestConfig = (url: string) => {
    return fetch(url, {
        method: "GET",
        headers: {
            'X-Auth-Token': 'f9810a17836e4050840680fe63fa0f01'
        }
    })
}

export default requestConfig;