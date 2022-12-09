const pkRunsApiBaseUrl='https://pk-runs-api.up.railway.app'

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

export function getAllStravaActivities(fields) {
    const fieldsParam = fields.length > 0 ? `?fields=${fields.join(',')}` : '';
    const endpoint = `${pkRunsApiBaseUrl}/all_activities${fieldsParam}`
    return pkRunsApiGet(endpoint)
}

export function getStravaAthleteStats() {
    const endpoint = `${pkRunsApiBaseUrl}/stats`
    return pkRunsApiGet(endpoint)
}
