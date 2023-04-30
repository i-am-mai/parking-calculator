import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { area } from '@turf/turf';
import { useState } from 'react';
import { Box, Typography, Fab, Drawer } from '@mui/material';
import comparisons from '../static/comparisons.json'

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
    const [show, setShow] = useState(false);
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
                color="primary" 
                variant="extended"
                sx={{
                    position: "fixed",
                    bottom: (theme) => theme.spacing(2),
                    right: (theme) => theme.spacing(2),
                }}>
                Show results
            </Fab>
            <Drawer
                anchor="bottom"
                open={show}
                onClose={handleClose}
            >
                <Box sx={{py: '1em', px: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant='h4' mb='0.5em'>
                        <span style={{fontWeight: '500'}}>Total Parking Area:</span> {(parkingArea / 2.59e6).toPrecision(3)} mi<sup>2</sup> ({(parkingArea / 1e6).toPrecision(3)} km<sup>2</sup>)
                    </Typography>
                    <Typography variant='h5'>
                        Or, about {Math.round(parkingArea / 16.7).toLocaleString()} parking spaces.
                    </Typography>
                    <Typography variant='h6'>
                        {comparisonString}
                    </Typography>
                </Box>
            </Drawer>
        </>
    )
}