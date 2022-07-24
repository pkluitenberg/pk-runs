import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { getAllStravaActivities, getStravaAthleteStats } from "./Strava/api";
import { Grid } from "@material-ui/core";
import { MapContainer, TileLayer } from "react-leaflet";
import PolylineWithPopup from "./Components/PolylineWithPopup";
import StatsList from "./Components/StatsList";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TimerIcon from "@mui/icons-material/Timer";
import MapIcon from "@mui/icons-material/Map";
import LandscapeIcon from "@mui/icons-material/Landscape";
import {
  getFeetFromMeters,
  getHoursFromSeconds,
  getMilesFromMeters,
  roundToTwoDecimalPlaces,
} from "./Strava/conversions";

const App = () => {
  const [perPage] = useState(90);
  const [activities, setActivities] = useState([]);
  const [ytdStats, setYtdStats] = useState({});
  const [allStats, setAllStats] = useState({});

  useEffect(() => {
    getAllStravaActivities(perPage).then((response) => {
      const allRuns = response.filter(
        (activity) =>
          activity.type === "Run" && activity.start_latlng.length > 0
      );

      setActivities(allRuns);
    });
    getStravaAthleteStats().then((response) => {
      setYtdStats(response.ytd_run_totals);
      setAllStats(response.all_run_totals);
    });
  }, [perPage]);
  return (
    <>
      {!activities || !ytdStats || !allStats ? (
        <div>Loading...</div>
      ) : (
        <Grid
          container
          spacing={6}
          className={"main-grid"}
          style={{
            width: "100vw",
            height: "100vh",
            margin: "0px",
          }}
        >
          <Grid item xs={10}>
            <MapContainer
              center={[39.828175, -98.5795]}
              zoom={4}
              scrollWheelZoom={true}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "4px",
                boxShadow: "16px 16px 16px rgb(239,240,244)",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <PolylineWithPopup activities={activities} />
            </MapContainer>
          </Grid>
          <Grid item xs={2}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ height: "100%", flexWrap: "nowrap" }}
            >
              <Grid
                item
                xs={6}
                style={{
                  height: "100%",
                  maxWidth: "100%",
                  width: "100%",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  color: "black",
                  boxShadow: "16px 16px 16px rgb(239,240,244)",
                }}
              >
                <StatsList
                  listTitle={"YTD Totals"}
                  listItems={[
                    {
                      avatar: <DirectionsRunIcon />,
                      title: "Runs:",
                      subheader: `${ytdStats.count}`,
                    },
                    {
                      avatar: <TimerIcon />,
                      title: "Time:",
                      subheader: `${Math.round(
                        getHoursFromSeconds(ytdStats.moving_time)
                      )} hrs`,
                    },
                    {
                      avatar: <MapIcon />,
                      title: "Distance:",
                      subheader: `${roundToTwoDecimalPlaces(
                        getMilesFromMeters(ytdStats.distance)
                      )} mi`,
                    },
                    {
                      avatar: <LandscapeIcon />,
                      title: "Elevation Gain:",
                      subheader: `${Math.round(
                        getFeetFromMeters(ytdStats.elevation_gain)
                      )} ft`,
                    },
                  ]}
                />
              </Grid>
              <br />
              <Grid
                item
                xs={6}
                style={{
                  height: "100%",
                  maxWidth: "100%",
                  width: "100%",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  color: "black",
                  boxShadow: "16px 16px 16px rgb(239,240,244)",
                }}
              >
                <StatsList
                  listTitle={"All Time Totals"}
                  listItems={[
                    {
                      avatar: <DirectionsRunIcon />,
                      title: "Runs:",
                      subheader: `${allStats.count}`,
                    },
                    {
                      avatar: <TimerIcon />,
                      title: "Time:",
                      subheader: `${Math.round(
                        getHoursFromSeconds(allStats.moving_time)
                      )} hrs`,
                    },
                    {
                      avatar: <MapIcon />,
                      title: "Distance:",
                      subheader: `${roundToTwoDecimalPlaces(
                        getMilesFromMeters(allStats.distance)
                      )} mi`,
                    },
                    {
                      avatar: <LandscapeIcon />,
                      title: "Elevation Gain:",
                      subheader: `${Math.round(
                        getFeetFromMeters(allStats.elevation_gain)
                      )} ft`,
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default App;
