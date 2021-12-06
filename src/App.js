import React, {useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {getAllStravaActivities} from "./Strava/api";
import {MapContainer, TileLayer} from "react-leaflet";
import PolylineWithPopup from "./Components/PolylineWithPopup";

const App = () => {
    const [perPage] = useState(90)
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAllStravaActivities(perPage).then(response => {
            const allRuns = response.filter(activity => activity.type === "Run")
            setActivities(allRuns)
        })
        setLoading(false)
    }, [perPage])
    console.log(activities)
    return (
        <>
            {
                loading ? <div>Loading...</div> : (
                    <div className="App">
                        <MapContainer center={[39.828175, -98.5795]} zoom={4} scrollWheelZoom={true}
                                      style={{height: '100vh', width: '40wh', align: 'vertical'}}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <PolylineWithPopup activities={activities}/>
                        </MapContainer>
                    </div>
                )
            }
        </>
    )
        ;
}

export default App;