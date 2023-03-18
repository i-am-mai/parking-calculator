import { useState } from 'react';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import './Home.css';

export default function Home() {
    const [boundingBox, setBoundingBox] = useState<[[number, number], [number, number]]>([[-40, -130],[60, 130]]);
    function updateBoundingBox(bbox: [[number, number], [number, number]]) {
        setBoundingBox(bbox);
    }

    return (
        <div className="content">
            <Sidebar setBoundingBox={updateBoundingBox}/>
            <Map boundingBox={boundingBox} setBoundingBox={updateBoundingBox}/>
        </div>
    );
}