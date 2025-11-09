import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON, LayersControl, FeatureGroup, Circle, LayerGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import "./Map.css";
import { LatLng, LatLngBounds } from 'leaflet';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { CircularProgress, Backdrop } from '@mui/material';
import { area, featureCollection, buffer, Feature } from '@turf/turf';

type MapProps = {
  circleCenter: LatLng;
  boundingBox: LatLngBounds;
  setBoundingBox: (bbox: LatLngBounds) => void;
  parkingData: FeatureCollection<Geometry, GeoJsonProperties> | null;
  isLoading: boolean;
  selectedArea: LatLngBounds;
  setSelectedArea: (bbox: LatLngBounds) => void;
}

export default function Map({ circleCenter, boundingBox, setBoundingBox, parkingData, isLoading, selectedArea, setSelectedArea }: MapProps) {
  const previousLayer = useRef<any>(null);

  function handleCreated(event: any) {
    const { layer } = event;
    if (previousLayer.current != null) {
      previousLayer.current.remove();
    }
    setSelectedArea(layer.getBounds());
    setBoundingBox(layer.getBounds());
    previousLayer.current = layer;
  }

  function handleEdited(event: any) {
    const { layers } = event;
    const editedLayer = layers.getLayers()[0];
    setSelectedArea(editedLayer.getBounds());
    setBoundingBox(editedLayer.getBounds());
    previousLayer.current = editedLayer;
  }

  function handleDeleted() {
    previousLayer.current = null;
  }

  function MapWrapper() {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(boundingBox);
    }, [map]);
    return null;
  }

  function GeoJSONLayer() {
    return parkingData ? <GeoJSON data={parkingData} /> : null;
  }

  function calculateParkingArea(parkingData: FeatureCollection<Geometry, GeoJsonProperties>): number {
    const turfGeoJSON = featureCollection(parkingData.features);
    const lines: Feature<Geometry, GeoJsonProperties>[] = [];
    const polygons: Feature<Geometry, GeoJsonProperties>[] = [];

    turfGeoJSON.features.forEach(feature => {
      if (feature.geometry.type === "LineString" || feature.geometry.type === "MultiLineString") {
        lines.push(feature);
      } else if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
        polygons.push(feature);
      }
    });

    const bufferWidth = 1.7; // Minimum parking space width in meters
    const bufferedParkingFeatures = lines.map(feature => buffer(feature, bufferWidth, { units: 'meters' }));
    const newStreetParkingData = featureCollection(bufferedParkingFeatures);
    const polygonData = featureCollection(polygons);
    return area(newStreetParkingData) + area(polygonData);
  }

  function CircleLayer() {
    if (!parkingData) return null;
    const parkingArea = calculateParkingArea(parkingData);
    const radius = Math.sqrt(parkingArea / Math.PI);
    return <Circle radius={radius} center={circleCenter} color="purple" opacity={0.5} />;
  }

  function LoadingLayer() {
    return (
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <MapContainer preferCanvas bounds={boundingBox} scrollWheelZoom className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Show parking" checked>
            <LayerGroup><GeoJSONLayer /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Show parking area as circle">
            <LayerGroup><CircleLayer /></LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

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
                },
              },
              polyline: false,
              polygon: false,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
            onCreated={handleCreated}
            onDeleted={handleDeleted}
            onEdited={handleEdited}
          />
        </FeatureGroup>

        <MapWrapper />
      </MapContainer>
      <LoadingLayer />
    </>
  );
}
