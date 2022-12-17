import React from "react";
import PropTypes from "prop-types";
import './AllTimeStats.css';
import { convertStravaDistance, convertStravaHeight, getHoursFromSeconds } from "../Strava/conversions";

const AllTimeStats = ({stats, system}) => {
    return (
        <center>
            <span className="all-time-stats-values"><b>{(Math.round(convertStravaDistance(stats.all_run_totals.distance, system))).toLocaleString()}</b><br /></span>
            <span>{system ? "Kilometers" : "Miles"} Run<br /></span>
            <span className="all-time-stats-values"><b>{(Math.round(convertStravaHeight(stats.all_run_totals.elevation_gain, system))).toLocaleString()}</b><br /></span>
            <span>{system ? "Meters" : "Feet"} of Elevation<br /></span>
            <span className="all-time-stats-values"><b>{(Math.round(getHoursFromSeconds(stats.all_run_totals.elapsed_time))).toLocaleString()}</b><br /></span>
            <span>Hours Spent Running</span>
        </center>
    )
}

AllTimeStats.propTypes = {
    stats: PropTypes.object.isRequired,
    system: PropTypes.bool.isRequired
}

export default AllTimeStats;
