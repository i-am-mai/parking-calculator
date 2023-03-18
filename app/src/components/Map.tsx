import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap} from 'react-leaflet';
import "./Map.css";

type MapProps = {
  boundingBox: [[number, number],[number, number]];
  setBoundingBox: (bbox: [[number, number], [number, number]]) => void;
}

export default function Map({boundingBox, setBoundingBox}: MapProps) {

  function MapWrapper() {
    const map = useMap();

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
