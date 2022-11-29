import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import React from "react";
import PropTypes from "prop-types";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getMilesFromMeters } from "../Strava/conversions";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

function prepareData(activities) {
    const now = dayjs()
    const startDate = now.subtract(12, 'w').startOf('isoWeek')

    const filteredData = activities.filter((activity) => (dayjs(activity.start_date_local) >= startDate))
    const subsetData = filteredData.map((activity) => ({
        distance: Math.round(getMilesFromMeters(activity.distance), 1),
        week: parseInt(`${dayjs(activity.start_date_local).format("YYYY")}${dayjs(activity.start_date_local).format("WW")}`)
    }))

    var summarizedData = [];
    subsetData.reduce(function (accum, currentValue) {
        if (!accum[currentValue.week]) {
            accum[currentValue.week] = { week: currentValue.week, distance: 0 };
            summarizedData.push(accum[currentValue.week]);
        }
        accum[currentValue.week].distance += currentValue.distance;
        return accum;
    }, {});

    return summarizedData.sort((a, b) => a.week > b.week);
}

const PaceOverTimeChart = ({ activities }) => {
    return (
        <ResponsiveContainer>
            <AreaChart margin={{ top: 24, bottom: 24, left: 24, right: 24 }} data={prepareData(activities)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" type="category" />
                <YAxis axisLine={false} tick={false} width={0} type="number" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Area dataKey="distance" stroke="black" activeDot={{ r: 8 }} dot={{ stroke: 'black', strokeWidth: 2, r: 4, fill: "white" }} fill="#898585" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

PaceOverTimeChart.propTypes = {
    activities: PropTypes.array.isRequired
}

export default PaceOverTimeChart;