import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { getAllStravaActivities, getStravaAthleteStats } from "./Strava/api";
import { Container, Grid } from "@material-ui/core";
import Card from '@mui/material/Card';
import { MapContainer, TileLayer } from "react-leaflet";
import PolylineWithPopup from "./Components/PolylineWithPopup";
import MoonLoader from "react-spinners/MoonLoader"
import { DateTime } from "luxon";
import './App.css';

const App = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [loadingMap, setLoadingMap] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    setLoadingMap(true);
    setLoadingStats(true);

    getAllStravaActivities().then(
      (response) => response.filter((activity) => activity.type === "Run" && activity.start_latlng.length > 0))
      .then((data) => {
        setActivities(data);
        setLoadingMap(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingMap(false);
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

  return (
    <div>
      <Container maxWidth={false} className="text-container">
        <h1 className='text-header'>HI, I'M PAUL</h1>
        <h3 className='text-body'>I like to run</h3>
        <h3 className='text-body'>and I like to travel</h3>
        <h3 className='text-body'>so I ran and I traveled</h3>
        <h3 className='text-body'>and every one of those <u>{(loadingStats || !(stats.all_run_totals)) ? "" : stats.all_run_totals.count}</u> runs </h3>
        <h3 className='text-body'>from the last <u>{getYearsAndDaysFromStart()}</u> is mapped here</h3> {/*put a counter here*/}

      </Container>
      {loadingMap ? (
        <MapContainer
          className="map-container"
          scrollWheelZoom={false}
        >
          <MoonLoader className="moon-loader" />
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
              {(loadingStats || !(stats.all_run_totals)) ? <MoonLoader className="moon-loader" /> : stats.all_run_totals.count}
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="card">
              {(loadingStats || !(stats.all_run_totals)) ? <MoonLoader className="moon-loader" /> : stats.ytd_run_totals.count}
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="card">
              {(loadingStats || !(stats.all_run_totals)) ? <MoonLoader className="moon-loader" /> : "Placeholder"}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;

