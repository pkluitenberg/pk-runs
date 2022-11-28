import { Container, Grid, Link } from "@material-ui/core";
import Card from '@mui/material/Card';
import "leaflet/dist/leaflet.css";
import { DateTime } from "luxon";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MoonLoader from "react-spinners/MoonLoader";
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import './App.css';
import PolylineWithPopup from "./Components/PolylineWithPopup";
import { getAllStravaActivities, getStravaAthleteStats } from "./Strava/api";
import { getFeetFromMeters, getHoursFromSeconds, getMilesFromMeters } from "./Strava/conversions";
import InstagramIcon from '@mui/icons-material/Instagram';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const App = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [loadingActivities, setloadingActivities] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    setloadingActivities(true);
    setLoadingStats(true);

    getAllStravaActivities().then(
      (response) => response.filter((activity) => activity.type === "Run" && activity.start_latlng.length > 0))
      .then((data) => {
        setActivities(data);
        setloadingActivities(false);
      })
      .catch((error) => {
        console.log(error);
        setloadingActivities(false);
      });

    getStravaAthleteStats()
      .then((data) => {
        setStats(data);
        setLoadingStats(false);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
        setLoadingStats(false);
      });
  };

  function getYearsAndDaysFromStart() {
    const currentDate = DateTime.now()
    const startDate = DateTime.fromISO("2020-01-04")

    const diff = currentDate.diff(startDate, ["years", "days"]).toObject()
    return `${diff.years} years and ${Math.trunc(diff.days)} days`
  }

  function getDataForCharts(activities) {
    const filteredData = activities.map((obj) => ({
      pace: (obj.moving_time / 60) / (obj.distance * 0.000621371192),
      date: obj.start_date_local,
      year: moment(obj.start_date_local).format("YYYY"),
      month: moment(obj.start_date_local).format("MMM")
    }))
    const sortedData = filteredData.sort((a, b) => moment(a.date) - moment(b.date))
    console.log(sortedData)
    return sortedData
  }

  return (
    <div>
      <Container maxWidth={false} className="text-container">
        <h1 className='text-header'>HI, I'M PAUL</h1>
        <h3 className='text-body'>I like to run</h3>
        <h3 className='text-body'>and I like to travel</h3>
        <h3 className='text-body'>so I ran and I traveled</h3>
        <h3 className='text-body'>and every one of those <strong>{(loadingStats || !(stats.all_run_totals)) ? "" : stats.all_run_totals.count}</strong> runs </h3>
        <h3 className='text-body'>from the last <strong>{getYearsAndDaysFromStart()}</strong> is mapped here</h3> {/*put a counter here*/}

      </Container>
      {loadingActivities ? (
        <MapContainer
          className="map-container"
          scrollWheelZoom={false}
        >
          <MoonLoader />
        </MapContainer>
      ) : (
        <MapContainer
          className="map-container"
          center={[39.828175, -98.5795]} // center on latest run
          zoom={4}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PolylineWithPopup activities={activities} />
        </MapContainer>
      )}
      <Container maxWidth={false} className="data-container">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card className="card">
              {(loadingStats || !(stats.all_run_totals))
                ? <MoonLoader />
                : <center>
                  <span className="all-time-stats-values"><b>{Math.round(getMilesFromMeters(stats.all_run_totals.distance))}</b><br /></span>
                  <span>Miles Run<br /></span>
                  <span className="all-time-stats-values"><b>{Math.round(getFeetFromMeters(stats.all_run_totals.elevation_gain))}</b><br /></span>
                  <span>Feet of Elevation<br /></span>
                  <span className="all-time-stats-values"><b>{Math.round(getHoursFromSeconds(stats.all_run_totals.elapsed_time))}</b><br /></span>
                  <span>Hours Spent Running</span>
                </center>
              }
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="card">
              {(loadingActivities || !(stats.all_run_totals))
                ? <MoonLoader />
                : <ResponsiveContainer>
                  <ScatterChart margin={{ top: 24, bottom: 24, left: 24, right: 24 }} data={getDataForCharts(activities)}>
                    <XAxis xAxisId={0} dataKey="month" type="category" />
                    <XAxis xAxisId={1} dataKey="year" allowDuplicatedCategory={false} type="category" axisLine={false} />
                    <YAxis dataKey="pace" name="Pace" axisLine={false} domain={[5, 16]} tick={false} width={0} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter fill="black" />
                  </ScatterChart>
                </ResponsiveContainer>
              }
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="card">
              {(loadingStats || !(stats.all_run_totals)) ? <MoonLoader /> : "Placeholder"}
            </Card>
          </Grid>
        </Grid >
      </Container >
      <Container maxWidth={false} className="footer-container">
        <div className="footer">
          <span> &copy; Paul Kluitenberg</span>
          <Link href="https://github.com/pkluitenberg" className="footer-link"><GithubIcon className="icons" /></Link>
          <Link href="https://instagram.com/d_townpaul" className="footer-link"><InstagramIcon className="icons" /></Link>
          <Link href="https://www.linkedin.com/in/paulkluitenberg/" className="footer-link"><LinkedInIcon className="icons" /></Link>
        </div>
      </Container>
    </div >
  );
};

export default App;