import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON, useMapEvent} from 'react-leaflet';
import "./Map.css";
import { LatLngBounds } from 'leaflet';

type MapProps = {
  boundingBox: LatLngBounds;
  setBoundingBox: (bbox: LatLngBounds) => void;
}

export default function Map({boundingBox, setBoundingBox}: MapProps) {
  // useEffect(() => {
  //   fetch(`/parking?bbox=${boundingBox[0][0]},${boundingBox[0][1]},${boundingBox[1][0]},${boundingBox[1][1]}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       var hash = require('object-hash');
  //       const parkingData = data;
  //       const style = {
  //         "color": "blue",

  //       };
  //       const parkingLayer = <GeoJSON key={hash(parkingData)} data={parkingData} style={style}></GeoJSON>
  //       setParkingLayer(parkingLayer);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  // });

  function MapWrapper() {
    const map = useMap();
    // const event = useMapEvent('moveend', () => {
    //   const newBounds = map.getBounds();
    //   setBoundingBox(newBounds);
    // });

    useEffect(() => {
      map.fitBounds(boundingBox);
    }, [map]);

    return (
      <>
      </>
    );
  }

  return (
    <MapContainer bounds={boundingBox} scrollWheelZoom={true} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapWrapper></MapWrapper>
    </MapContainer>
  );
}
