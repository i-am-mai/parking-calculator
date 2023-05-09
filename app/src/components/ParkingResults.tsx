import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { area } from '@turf/turf';
import { Typography, Fab, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import './ParkingResults.css';
import CloseIcon from '@mui/icons-material/Close';
import { LatLngBounds } from 'leaflet';
import bboxPolygon from "@turf/bbox-polygon";


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
    let parkingArea: number = 0;
    if (parkingData != null) {
        parkingArea = area(parkingData);
    }
    else {
        return <></>
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

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
                    {/* <Typography variant="body2">
                        {comparisonString}
                    </Typography> */}
                </DialogContent>
            </Dialog>
        </>
    )
}