import React from "react";
import PropTypes from "prop-types";
import './AllTimeStats.css';
import { getFeetFromMeters, getHoursFromSeconds, getMilesFromMeters } from "../Strava/conversions";

const AllTimeStats = ({stats}) => {
    return (
        <center>
            <span className="all-time-stats-values"><b>{Math.round(getMilesFromMeters(stats.all_run_totals.distance))}</b><br /></span>
            <span>Miles Run<br /></span>
            <span className="all-time-stats-values"><b>{Math.round(getFeetFromMeters(stats.all_run_totals.elevation_gain))}</b><br /></span>
            <span>Feet of Elevation<br /></span>
            <span className="all-time-stats-values"><b>{Math.round(getHoursFromSeconds(stats.all_run_totals.elapsed_time))}</b><br /></span>
            <span>Hours Spent Running</span>
        </center>
    )
}

AllTimeStats.propTypes = {
    stats: PropTypes.object.isRequired
}

export default AllTimeStats;
