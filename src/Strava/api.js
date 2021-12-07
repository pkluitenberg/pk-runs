export async function refreshAccessToken() {
    const refreshTokenUrl = `https://www.strava.com/oauth/token?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}&refresh_token=${process.env.REACT_APP_STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`
    return await fetch(refreshTokenUrl, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            return data.access_token
        })
}

export async function stravaApiGet(endpointUrl) {
    const access_token = await refreshAccessToken()

    return await fetch(endpointUrl, {
        method: 'get',
        headers: new Headers({'Authorization': `Bearer ${access_token}`})
    })
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(e => console.log(e))
}

export function getAllStravaActivities(per_page) {
    const endpoint = `https://www.strava.com/api/v3/athlete/activities?per_page=${per_page}`
    return stravaApiGet(endpoint)
}

export function getStravaAthleteStats() {
    const endpoint = `https://www.strava.com/api/v3/athletes/${process.env.REACT_APP_STRAVA_ATHLETE_ID}/stats`
    return stravaApiGet(endpoint)
}
