import { Polyline, Popup } from "react-leaflet";
import React from "react";
import PropTypes from "prop-types";
import { decode } from "@googlemaps/polyline-codec";
import {
    getFeetFromMeters,
    getFormattedPaceMinPerMile,
    getFormattedTimeFromSeconds,
    getMilesFromMeters,
    getMinutesFromSeconds,
    roundToTwoDecimalPlaces
} from "../Strava/conversions";

function hasPolyline(activity) {
    return activity.start_latlng.length > 0;
}

const PolylineWithPopups = ({ activities }) => {
    console.log(activities)
    return activities.filter(hasPolyline).map((activity, index) => {
        const formattedDate = (activity.start_date_local).split('T')[0]
        const distanceInMiles = getMilesFromMeters(activity.distance)
        const timeInMinutes = getMinutesFromSeconds(activity.moving_time)
        const formattedTime = getFormattedTimeFromSeconds(activity.moving_time)
        const paceMinMile = getFormattedPaceMinPerMile(distanceInMiles, timeInMinutes)
        const elevationGainInFeet = getFeetFromMeters(activity.total_elevation_gain)

        return (<Polyline className="polyline" key={index}
            pathOptions={{ color: 'rgb(27,52,79)' }}
            positions={decode(activity.map.summary_polyline)}
            eventHandlers={{
                mouseover: (e) => {
                    e.target.openPopup()
                },
                mouseout: (e) => {
                    e.target.closePopup()
                }
            }}
        >
            <Popup key={index}>
                Date: {formattedDate} <br />
                Distance: {roundToTwoDecimalPlaces(distanceInMiles)} mi <br />
                Elev. Gain: {Math.round(elevationGainInFeet)} ft <br />
                Time: {formattedTime} <br />
                Pace: {paceMinMile} /mi <br />
                Avg. HR: {Math.round(activity.average_heartrate)} bpm

            </Popup>
        </Polyline >)
    })

};

PolylineWithPopups.propTypes = {
    activities: PropTypes.array
}

export default PolylineWithPopups;