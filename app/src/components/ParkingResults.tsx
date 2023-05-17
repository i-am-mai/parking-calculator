import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { area, featureCollection, Feature, buffer } from '@turf/turf';
import { Typography, Fab, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import './ParkingResults.css';
import CloseIcon from '@mui/icons-material/Close';
import { LatLngBounds } from 'leaflet';
import bboxPolygon from "@turf/bbox-polygon";
import { useMemo } from 'react';


type ParkingResultsProps = {
    setShow: (show: boolean) => void;
    show: boolean;
    boundingBox: LatLngBounds;
    parkingData: FeatureCollection<Geometry, GeoJsonProperties> | null;
}

function calculateBBoxArea(bbox: LatLngBounds) {
    let polygon = bboxPolygon([bbox.getSouthWest().lng, bbox.getSouthWest().lat, bbox.getNorthEast().lng, bbox.getNorthEast().lat]);
    return area(polygon);
}

export default function ParkingResults({setShow, show, boundingBox, parkingData} : ParkingResultsProps) {
    const parkingArea: number = useMemo(() => {
        if (parkingData != null) {
            const turfGeoJSON = featureCollection(parkingData.features);
            const lines: Feature<Geometry, GeoJsonProperties>[] = [];
            const polygons: Feature<Geometry, GeoJsonProperties>[] = [];
    
            turfGeoJSON.features.forEach(feature => {
                if (feature.geometry.type === "LineString" || feature.geometry.type === "MultiLineString") {
                    lines.push(feature);
                }
                else if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
                    polygons.push(feature);
                }
            })
    
            const bufferWidth = 1.7; // Minimum parking space width is 1.7 meters in the US
    
            const bufferedParkingFeatures = lines.map(feature => {
                const bufferedFeature = buffer(feature, bufferWidth, {units: 'meters'});
                return bufferedFeature;
            })
    
            const newStreetParkingData = featureCollection(bufferedParkingFeatures);
            const polygonData = featureCollection(polygons);
            return area(newStreetParkingData) + area(polygonData);
        }
        else {
            return 0;
        }}, [parkingData])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    if (parkingData == null) {
        return <></>
    }
    else {
        return (
            <>
                <Fab 
                    onClick={handleShow} 
                    color="info" 
                    variant="extended"
                    sx={{
                        position: "fixed",
                        bottom: (theme) => theme.spacing(2),
                        right: (theme) => theme.spacing(2),
                    }}>
                    Results
                </Fab>
                <Dialog
                    open={show}
                    onClose={handleClose}
                >
                    <DialogTitle className="dialog-title">
                        Results
                        <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            marginLeft: "auto",
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers className="dialog-content">
                        <Typography variant="body1">
                            Total parking area: <span className="result-text">{(parkingArea / 2.59e6).toPrecision(3)} mi<sup>2</sup></span> ({(parkingArea / 1e6).toPrecision(3)} km<sup>2</sup>)
                        </Typography>
                        <Typography variant="body1">
                            Parking spaces: about <span className="result-text">{Math.round(parkingArea / 16.7).toLocaleString()}</span> spaces
                        </Typography>
                        <Typography variant="body1">
                            Percent of bounded area: <span className="result-text">{(parkingArea * 100 / calculateBBoxArea(boundingBox)).toPrecision(3)}%</span>
                        </Typography>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

}