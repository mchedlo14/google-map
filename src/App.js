import { DistanceMatrixService, GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCxGMM1FEYwcFo1ODhzYkjQlhpCC2sWbJc" });

    if(!isLoaded) return <div>Loading...</div>

    return <Map />
};

const Map = () => {
    const [markers, setMarkers] = useState([]);
    
    const handleGetLocation = (ev) => {
        const latlng = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
        console.log(markers.length);
        if(markers.length <= 1) setMarkers((prev) => [...prev, latlng]);
        else {
            setMarkers(markers.splice(0, 1));
            setMarkers((prev) => [...prev, latlng])
        };
    }

    const handleDistanceResponse = (response) => {
        if(markers.length === 2) {
            alert(`distance : ${response.rows[0].elements[0].distance.text}\nestimated time: ${response.rows[0].elements[0].duration.text}`);
        }
    }
    
    const center = { lat: 44, lng: -80 };
    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="mapContainer" onClick={(ev) => handleGetLocation(ev)}>
            {markers.map(e => {
                return <Marker position={{ lat: e.lat, lng: e.lng }} />
            })}
            <DistanceMatrixService key={markers}
                options={{
                        destinations: [markers[1]],
                        origins: [markers[0]],
                        travelMode: "DRIVING",
                        }}
                callback = {(response) => handleDistanceResponse(response)}
            />
        </GoogleMap>
    )
}

export default App;