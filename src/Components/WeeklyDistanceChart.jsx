import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import PropTypes from "prop-types";
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { convertStravaDistance } from "../Strava/conversions";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

function prepareData(activities) {
    const now = dayjs()
    const startDate = now.subtract(12, 'w').startOf('isoWeek')

    const filteredData = activities.filter((activity) => (dayjs(activity.start_date_local) >= startDate))
    const subsetData = filteredData.map((activity) => ({
        distanceMetric: Math.round(convertStravaDistance(activity.distance, true), 1),
        distanceImperial: Math.round(convertStravaDistance(activity.distance, false), 1),
        week: parseInt(`${dayjs(activity.start_date_local).format("YYYY")}${dayjs(activity.start_date_local).format("WW")}`)
    }))

    var summarizedData = [];
    subsetData.reduce(function (accum, currentValue) {
        if (!accum[currentValue.week]) {
            accum[currentValue.week] = { week: currentValue.week, distanceMetric: 0, distanceImperial: 0 };
            summarizedData.push(accum[currentValue.week]);
        }
        accum[currentValue.week].distanceMetric += currentValue.distanceMetric;
        accum[currentValue.week].distanceImperial += currentValue.distanceImperial;
        return accum;
    }, {});

    return summarizedData.sort((a, b) => a.week > b.week);
}

const WeeklyDistanceChart = ({ activities, system }) => {
    return (
        <ResponsiveContainer>
            <AreaChart margin={{ top: 24, bottom: 24, left: 24, right: 24 }} data={prepareData(activities)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" type="category" />
                <YAxis axisLine={false} tick={false} width={0} type="number" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Area dataKey={system ? "distanceMetric" : "distanceImperial"} stroke="black" activeDot={{ r: 8 }} dot={{ stroke: 'black', strokeWidth: 2, r: 4, fill: "white" }} fill="#C1C9CC" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

WeeklyDistanceChart.propTypes = {
    activities: PropTypes.array.isRequired,
    system: PropTypes.bool.isRequired
}

export default WeeklyDistanceChart;