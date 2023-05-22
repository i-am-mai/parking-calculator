import { useState } from 'react';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import ParkingResults from '../components/ParkingResults';
import './Home.css';
import Tutorial from '../components/Tutorial';
import { LatLngBounds, LatLng } from 'leaflet';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

export default function Home() {
    let bounds = new LatLngBounds(new LatLng(-40, -130), new LatLng(60, 130));
    let selectedBounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));
    const [boundingBox, setBoundingBox] = useState<LatLngBounds>(bounds);
    const [parkingData, setParkingData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
    const [selectedArea, setSelectedArea] = useState<LatLngBounds>(selectedBounds);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(true);

    function updateShow(show: boolean) {
        setShow(show);
    }

    function updateBoundingBox(bbox: LatLngBounds) {
        setBoundingBox(bbox);
    }

    function updateSelectedArea(bbox: LatLngBounds) {
        setSelectedArea(bbox);
    }

    function updateParkingData(parkingData : FeatureCollection<Geometry, GeoJsonProperties>) {
        setParkingData(parkingData);
    }

    function updateIsLoading(isLoading: boolean) {
        setIsLoading(isLoading);
    }

    return (
        <>
            <Tutorial></Tutorial>
            <div className="content">
                <Sidebar setShow={updateShow} setBoundingBox={updateBoundingBox} selectedArea={selectedArea} setParkingData={updateParkingData} setIsLoading={updateIsLoading}/>
                <Map boundingBox={boundingBox} setBoundingBox={updateBoundingBox} selectedArea={selectedArea} setSelectedArea={updateSelectedArea} parkingData={parkingData} isLoading={isLoading}/>
                <ParkingResults show={show} setShow={setShow} boundingBox={boundingBox} parkingData={parkingData}></ParkingResults>
            </div>
        </>
    );
}