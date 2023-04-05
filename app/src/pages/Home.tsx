import { useState } from 'react';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import './Home.css';
import { LatLngBounds, LatLng } from 'leaflet';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

export default function Home() {
    let bounds = new LatLngBounds(new LatLng(-40, -130), new LatLng(60, 130));

    const [boundingBox, setBoundingBox] = useState<LatLngBounds>(bounds);
    const [parkingData, setParkingData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

    function updateBoundingBox(bbox: LatLngBounds) {
        setBoundingBox(bbox);
    }

    function updateParkingData(parkingData : FeatureCollection<Geometry, GeoJsonProperties>) {
        setParkingData(parkingData);
    }

    return (
        <div className="content">
            <Sidebar boundingBox={boundingBox} setBoundingBox={updateBoundingBox} setParkingData={updateParkingData}/>
            <Map boundingBox={boundingBox} setBoundingBox={updateBoundingBox} parkingData={parkingData}/>
        </div>
    );
}