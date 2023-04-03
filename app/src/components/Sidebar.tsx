import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import SearchResults from './SearchResults';
import "./Sidebar.css"
import { LatLngBounds } from 'leaflet';
import osmtogeojson from 'osmtogeojson';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

type SidebarProps = {
    boundingBox: LatLngBounds,
    setBoundingBox: (bbox: LatLngBounds) => void;
    setParkingData: (parkingData : FeatureCollection<Geometry, GeoJsonProperties>) => void;
}

export default function Sidebar({boundingBox, setBoundingBox, setParkingData}: SidebarProps) {
    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(false);


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSpinner(true);
        let query = (event.target as HTMLFormElement).search.value;
        console.log(query);

        let url: URL = new URL("https://nominatim.openstreetmap.org/search?format=jsonv2");
        url.searchParams.append("q", query);

        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
            .then(() => setSpinner(false));
    }

    function handleCalculateParking(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        let bbox: string = String(boundingBox.getSouth()) + "," + String(boundingBox.getWest()) + "," + String(boundingBox.getNorth())+ "," + String(boundingBox.getEast());
        const url = new URL("https://overpass-api.de/api/interpreter");

        let parkingQuery = `
        [out:json][timeout:25];
        (
            way["amenity"="parking"](${bbox});
            relation["amenity"="parking"](${bbox});
            way["highway"]["parking:lane:both"](${bbox});
        );
        out body;
        >;
        out skel qt;`;
        url.searchParams.append('data', parkingQuery);
        fetch(url)
            .then((response: Response) => response.json())
            .then((data : JSON) => {
                let geoJSONData: FeatureCollection<Geometry, GeoJsonProperties> = osmtogeojson(data);
                setParkingData(geoJSONData);
            });
    }

    let results;

    if (spinner) {
        results = <Spinner animation="border" id="spinner"></Spinner>
    }
    else {
        results = <SearchResults results={data} onClick={setBoundingBox}/>
    }

    return (
        <div className="sidebar">
            <form onSubmit={handleSubmit} className="input">
                <Form.Control name="search" placeholder="ex. New York, NY"></Form.Control>
                <Button variant="secondary" type="submit">Search</Button>    
            </form>
            {results}
            <Button variant="primary" className="calculate" onClick={handleCalculateParking}>Calculate parking area</Button>
        </div>
    );
}

