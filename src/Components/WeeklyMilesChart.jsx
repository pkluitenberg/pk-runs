import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { getMilesFromMeters } from "../Strava/conversions";

function prepareData(activities) {
    const subsetData = activities.map((activity) => ({
        pace: (activity.moving_time / 60) / (getMilesFromMeters(activity.distance)),
        date: activity.start_date_local,
        year: dayjs(activity.start_date_local).format("YYYY"),
        month: dayjs(activity.start_date_local).format("MMM")
    }));
    return subsetData.sort((a, b) => dayjs(a.date) - dayjs(b.date));
}

const WeeklyMilesChart = ({ activities }) => {
    return (
        <ResponsiveContainer>
            <ScatterChart margin={{ top: 24, bottom: 24, left: 24, right: 24 }} data={prepareData(activities)}>
                <XAxis xAxisId={0} dataKey="month" type="category" />
                <XAxis xAxisId={1} dataKey="year" allowDuplicatedCategory={false} type="category" axisLine={false} />
                <YAxis dataKey="pace" name="Pace" axisLine={false} domain={[5, 16]} tick={false} width={0} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter fill="black" activeDot={{ r: 8 }} />
            </ScatterChart>
        </ResponsiveContainer>
    )
}

WeeklyMilesChart.propTypes = {
    activities: PropTypes.array.isRequired
}

export default WeeklyMilesChart;