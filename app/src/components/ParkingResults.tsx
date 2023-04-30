import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { area } from '@turf/turf';
import { useState } from 'react';
import { Typography, Fab, Dialog, DialogTitle, DialogContent, Button, IconButton } from '@mui/material';
import comparisons from '../static/comparisons.json'
import './ParkingResults.css';
import CloseIcon from '@mui/icons-material/Close';


var pluralize = require('pluralize')

type ParkingResultsProps = {
    parkingData: FeatureCollection<Geometry, GeoJsonProperties> | null;
}

let comparisonString = "";

function generateRandom(parkingArea: number) : string {
    let index = Math.floor(Math.random() * comparisons.length);
    let count = parkingArea / comparisons[index].size;
    return `That's ${(Math.round(count)).toLocaleString()} ${pluralize(comparisons[index].name, Math.round(count))}!`
}

export default function ParkingResults({parkingData} : ParkingResultsProps) {
    const [show, setShow] = useState(true);
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
        comparisonString = generateRandom(parkingArea);
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
                        Or, about <span className="result-text">{Math.round(parkingArea / 16.7).toLocaleString()}</span> parking spaces.
                    </Typography>
                    <Typography variant="body2">
                        {comparisonString}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}