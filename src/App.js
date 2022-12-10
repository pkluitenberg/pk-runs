import { Container, Grid } from "@material-ui/core";
import { Card, ToggleButton, ToggleButtonGroup } from '@mui/material';
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MoonLoader from "react-spinners/MoonLoader";
import './App.css';
import AllTimeStats from "./Components/AllTimeStats";
import Footer from "./Components/Footer";
import PaceOverTimeChart from "./Components/PaceOverTimeChart";
import PolylineWithPopup from "./Components/PolylineWithPopup";
import WeeklyDistanceChart from "./Components/WeeklyDistanceChart";
import { getAllStravaActivities, getStravaAthleteStats } from "./Strava/api";

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

const App = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [loadingActivities, setloadingActivities] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [system, setSystem] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSystemChange = (event, newValue) => {
    setSystem(newValue);
  };

  const fetchActivities = () => {
    const activityFields = ['start_latlng', 'start_date_local', 'distance', 'moving_time', 'total_elevation_gain', 'map', 'average_heartrate', 'type'];

    setloadingActivities(true);
    setLoadingStats(true);

    getAllStravaActivities(activityFields).then(
      (response) => response.filter((activity) => activity.type === "Run"))
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
      })
      .catch((error) => {
        console.log(error);
        setLoadingStats(false);
      });
  };

  function getYearsAndDaysFromStart() {
    const diff = dayjs().diff(dayjs("2020-01-04"), "y", true);
    const diffYears = Math.floor(diff);
    const diffDays = Math.floor((diff - diffYears) * 365);

    return `${diffYears} years and ${diffDays} days`;
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
          doubleClickZoom={true}
        >
          <ToggleButtonGroup
            className="toggle-button"
            orientation="vertical"
            size="small"
            color="primary"
            value={system}
            exclusive
            onChange={handleSystemChange}
          >
            <ToggleButton value={false}>MI</ToggleButton>
            <ToggleButton value={true}>KM</ToggleButton>
          </ToggleButtonGroup>
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            maxZoom={19}
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
                : <AllTimeStats stats={stats} system={system} />
              }
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="card">
              {(loadingActivities)
                ? <MoonLoader />
                : <WeeklyDistanceChart activities={activities} system={system} />
              }
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className="card">
              {(loadingActivities)
                ? <MoonLoader />
                : <PaceOverTimeChart activities={activities} system={system} />
              }
            </Card>
          </Grid>∏
        </Grid >
      </Container >
      <Container maxWidth={false} className="footer-container">
        <Footer />
      </Container>
    </div >
  );
};

export default App;