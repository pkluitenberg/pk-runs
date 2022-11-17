export function getMilesFromMeters(meters) {
    return meters*0.000621371192;
}

export function getFeetFromMeters(feet) {
    return feet*3.2808399;
}

export function roundToTwoDecimalPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

export function getMinutesFromSeconds(seconds) {
    return seconds/60
}

export function getHoursFromSeconds(seconds) {
    return seconds/60/60
}

export function getFormattedTimeFromSeconds(seconds) {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
}

export function getFormattedPaceMinPerMile(miles, minutes) {
    const pace = minutes/miles
    const paceSeconds = pace % 1
    return `${Math.floor(pace)}:${Math.round(paceSeconds*60)}`
}