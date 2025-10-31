import { useState } from 'react';
import { TextField, CircularProgress, Button, Alert } from '@mui/material';
import SearchResults from './SearchResults';
import "./Sidebar.css"
import { LatLng, LatLngBounds } from 'leaflet';
import osmtogeojson from 'osmtogeojson';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { fetchWithTimeoutAndRetry } from '../utils/api';

type SidebarProps = {
    setCircleCenter: (center: LatLng) => void;
    setShow: (show: boolean) => void;
    setBoundingBox: (bbox: LatLngBounds) => void;
    setParkingData: (parkingData : FeatureCollection<Geometry, GeoJsonProperties>) => void;
    setIsLoading: (isLoading: boolean) => void;
    selectedArea: LatLngBounds;
}

export default function Sidebar({setCircleCenter, setShow, setBoundingBox, setParkingData, setIsLoading, selectedArea}: SidebarProps) {
    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [overpassError, setOverpassError] = useState<string | null>(null);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSpinner(true);
        setSearchError(null);
        let query = (event.target as HTMLFormElement).search.value;

        let url: URL = new URL("https://nominatim.openstreetmap.org/search?format=jsonv2");
        url.searchParams.append("q", query);

        try {
            const response = await fetchWithTimeoutAndRetry(url, {
                headers: {
                    'Accept': 'application/json'
                }
            }, { timeoutMs: 10000, retries: 2, backoffMs: 500 });
            const json = await response.json();
            setData(json);
        } catch (err) {
            setSearchError('Failed to fetch search results. Please try again.');
        } finally {
            setSpinner(false);
        }
    }

    async function handleCalculateParking(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsLoading(true);
        setOverpassError(null);
        let bbox: string = String(selectedArea.getSouth()) + "," + String(selectedArea.getWest()) + "," + String(selectedArea.getNorth())+ "," + String(selectedArea.getEast());
        const url = new URL("https://overpass-api.de/api/interpreter");

        let parkingQuery = `
        [out:json][timeout:25];
        (
            way["amenity"="parking"](${bbox});
            relation["amenity"="parking"](${bbox});
            way["highway"]["parking:lane:both"]["parking:lane:both"!~"no"](${bbox});
            way["highway"]["parking:lane:right"]["parking:lane:right"!~"no"](${bbox});
            way["highway"]["parking:lane:left"]["parking:lane:left"!~"no"](${bbox});
        );
        out body;
        >;
        out skel qt;`;
        url.searchParams.append('data', parkingQuery);

        try {
            const response = await fetchWithTimeoutAndRetry(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }, { timeoutMs: 30000, retries: 2, backoffMs: 800 });
            const json: JSON = await response.json();
            let geoJSONData: FeatureCollection<Geometry, GeoJsonProperties> = osmtogeojson(json);
            setParkingData(geoJSONData);
            setShow(true);
            setCircleCenter(selectedArea.getCenter());
        } catch (err) {
            setOverpassError('Overpass API request failed or timed out. Try a smaller area or retry.');
        } finally {
            setIsLoading(false);
        }
    }

    let results;

    if (spinner) {
        results = <CircularProgress id="spinner"/>
    }
    else {
        results = <SearchResults results={data} onClick={setBoundingBox}/>
    }

    return (
        <div className="sidebar">
            <form onSubmit={handleSubmit} className="form-input">
                <TextField variant="outlined" size="small" fullWidth label="Search for a location" name="search" placeholder="ex. New York, NY" id="search"></TextField>
                <Button variant="outlined" type="submit">Search</Button>    
            </form>
            {searchError && <Alert severity="error" sx={{ mt: 1 }}>{searchError}</Alert>}
            {results}
            {overpassError && <Alert severity="error" sx={{ mb: 1 }}>{overpassError}</Alert>}
            <Button variant="contained" className="calculate" onClick={handleCalculateParking}>Calculate parking area</Button>
        </div>
    );
}

