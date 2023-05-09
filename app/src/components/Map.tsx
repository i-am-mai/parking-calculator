import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON, LayersControl, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import "./Map.css";
import { LatLngBounds } from 'leaflet';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import ParkingResults from './ParkingResults';
import {CircularProgress, Backdrop} from '@mui/material';
import { area } from '@turf/turf';

type MapProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  boundingBox: LatLngBounds;
  setBoundingBox: (bbox: LatLngBounds) => void;
  parkingData: FeatureCollection<Geometry, GeoJsonProperties> | null;
  isLoading: boolean;
  selectedArea: LatLngBounds;
  setSelectedArea: (bbox: LatLngBounds) => void;
}

export default function Map({show, setShow, boundingBox, setBoundingBox, parkingData, isLoading, selectedArea, setSelectedArea}: MapProps) {
  let previousLayer: any = null;


  function handleCreated(event: any) {
    const { layer } = event;
    if (previousLayer != null) {
      previousLayer.remove();
    }
    setSelectedArea(layer.getBounds());
    setBoundingBox(layer.getBounds());
    console.log(layer.getBounds());
    previousLayer = layer;
  }

  function handleEdited(event: any) {
    console.log(event.layers);
    const { layers } = event;
    setSelectedArea(layers.getLayers()[0].getBounds());
    setBoundingBox(layers.getLayers()[0].getBounds());
    console.log(layers.getLayers()[0].getBounds());
    previousLayer = layers.getLayers()[0];
  }

  function handleDeleted() {
    previousLayer = null;
  }

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

  function GeoJSONLayer() {
    if (parkingData != null) {
      return <GeoJSON data={parkingData}></GeoJSON>
    }
    else {
      return <></>
    }
  }

  function CircleLayer() {
    if (parkingData != null) {
      let parkingArea = area(parkingData);
      let radius = Math.sqrt(parkingArea / Math.PI);
      let center = selectedArea.getCenter();
      return <Circle radius={radius} center={center} color="purple" opacity={0.5}></Circle>
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
      <MapContainer preferCanvas bounds={boundingBox} scrollWheelZoom={true} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />    
        
        {
          parkingData != null && 
          <LayersControl position="topright">
            <LayersControl.Overlay name="Show parking" checked>
              <GeoJSONLayer></GeoJSONLayer>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Show parking area as circle">
              <CircleLayer></CircleLayer>
            </LayersControl.Overlay>
          </LayersControl> 
        }

        <FeatureGroup>
          <EditControl
            position='topleft'
            draw={{
              rectangle: {
                shapeOptions: {
                  opacity: 0.2,
                  fillOpacity: 0.05,
                  fill: true,
                  color: '#FF0000',
                }
              },
              polyline: false,
              polygon: false,
              circle: false,
              marker: false,
              circlemarker: false
            }}
            onCreated={handleCreated}
            onDeleted={handleDeleted}
            onEdited={handleEdited}
          />
        </FeatureGroup>
        <MapWrapper></MapWrapper>
      </MapContainer>
      <ParkingResults show={show} setShow={setShow} boundingBox={boundingBox} parkingData={parkingData}></ParkingResults>
      <LoadingLayer></LoadingLayer>
    </>
  );
}
