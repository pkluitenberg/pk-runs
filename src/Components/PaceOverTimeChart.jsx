import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { convertStravaDistance } from "../Strava/conversions";

function prepareData(activities) {
    const subsetData = activities.map((activity) => ({
        paceMetric: (activity.moving_time / 60) / (convertStravaDistance(activity.distance, true)),
        paceImperial: (activity.moving_time / 60) / (convertStravaDistance(activity.distance, false)),
        date: activity.start_date_local,
        year: dayjs(activity.start_date_local).format("YYYY"),
        month: dayjs(activity.start_date_local).format("MMM")
    }));
    return subsetData.sort((a, b) => dayjs(a.date) - dayjs(b.date));
}

const PaceOverTimeChart = ({ activities, system }) => {
    return (
        <ResponsiveContainer>
            <ScatterChart margin={{ top: 24, bottom: 24, left: 24, right: 24 }} data={prepareData(activities, system)}>
                <XAxis xAxisId={0} dataKey="month" type="category" />
                <XAxis xAxisId={1} dataKey="year" allowDuplicatedCategory={false} type="category" axisLine={false} />
                <YAxis dataKey={system ? "paceMetric" : "paceImperial"} name="Pace" axisLine={false} tick={false} width={0} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter fill="black" />
            </ScatterChart>
        </ResponsiveContainer>
    )
}

PaceOverTimeChart.propTypes = {
    activities: PropTypes.array.isRequired,
    system: PropTypes.bool.isRequired
}

export default PaceOverTimeChart;