import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { area } from '@turf/turf';
import { useState } from 'react';
import { Button, Offcanvas} from 'react-bootstrap';

type ParkingResultsProps = {
    parkingData: FeatureCollection<Geometry, GeoJsonProperties> | null;
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
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow}>Show</Button>
            <Offcanvas show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Total Parking Area: {parkingArea} m<sup>2</sup>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Or, {parkingArea / 2.59e6} mi<sup>2</sup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}