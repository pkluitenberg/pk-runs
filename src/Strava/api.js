const pkRunsApiBaseUrl='https://pk-runs-api.up.railway.app/'

export async function pkRunsApiGet(endpointUrl) {

    return await fetch(endpointUrl, {
        method: 'get'
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(e => console.log(e))
}

export function getAllStravaActivities() {
    const endpoint = `${pkRunsApiBaseUrl}/all_activities`
    return pkRunsApiGet(endpoint)
}

export function getStravaAthleteStats() {
    const endpoint = `${pkRunsApiBaseUrl}/all_stats`
    return pkRunsApiGet(endpoint)
}
