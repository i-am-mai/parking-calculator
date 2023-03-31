import { useState } from 'react';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import './Home.css';
import { LatLngBounds, LatLng } from 'leaflet';


export default function Home() {
    let bounds = new LatLngBounds(new LatLng(-40, -130), new LatLng(60, 130))


    const [boundingBox, setBoundingBox] = useState<LatLngBounds>(bounds);
    function updateBoundingBox(bbox: LatLngBounds) {
        setBoundingBox(bbox);
    }

    return (
        <div className="content">
            <Sidebar setBoundingBox={updateBoundingBox}/>
            <Map boundingBox={boundingBox} setBoundingBox={updateBoundingBox}/>
        </div>
    );
}