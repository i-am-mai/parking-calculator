import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON} from 'react-leaflet';
import "./Map.css";
import { LatLngBounds } from 'leaflet';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import ParkingResults from './ParkingResults';
import {CircularProgress, Backdrop} from '@mui/material';

type MapProps = {
  boundingBox: LatLngBounds;
  setBoundingBox: (bbox: LatLngBounds) => void;
  parkingData: FeatureCollection<Geometry, GeoJsonProperties> | null;
  isLoading: boolean;
}

export default function Map({boundingBox, setBoundingBox, parkingData, isLoading}: MapProps) {
  function MapWrapper() {
    const map = useMap();

    useEffect(() => {
      map.fitBounds(boundingBox);
    }, [map]);

    map.on('zoomend', function() { 
      setBoundingBox(map.getBounds());
    });

    map.on('dragend', function() { 
      setBoundingBox(map.getBounds());
    });
    return (
      <>
      </>
    );
  }

  function GeoJSONLayer() {
    if (parkingData != null) {
      return <GeoJSON data={parkingData}></GeoJSON>
    }
    else {
      return <></>
    }
  }

  function LoadingLayer() {
    return (
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
    );
  }

  return (
    <>
      <MapContainer bounds={boundingBox} scrollWheelZoom={true} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapWrapper></MapWrapper>
        <GeoJSONLayer></GeoJSONLayer>
      </MapContainer>
      <ParkingResults parkingData={parkingData}></ParkingResults>
      <LoadingLayer></LoadingLayer>
    </>
  );
}
