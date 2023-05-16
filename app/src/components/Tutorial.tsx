import Carousel from 'react-material-ui-carousel';
import { Dialog, IconButton } from '@mui/material';
import {useState} from 'react';
import './Tutorial.css';
import CloseIcon from '@mui/icons-material/Close';

export default function Tutorial() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 4,
                    top: 4,
                    zIndex: 5000
                }}
            >
                <CloseIcon />
            </IconButton>
            <Carousel sx={{width: '350px'}} className='carousel' autoPlay={false} animation='fade'>
                <div className='carousel-card'>
                    <h2>Welcome to the Parking Calculator!</h2>
                    <p>This tool helps you find how much area parking takes up.</p>
                </div>
                <div className='carousel-card'>
                    <h2>How to use:</h2>
                    <p>First, locate the site that you want to find the parking area of.</p>
                    <video width="100%" autoPlay loop>
                        <source src='./videos/Step_1.mov'></source>
                    </video>
                </div>
                <div className='carousel-card'>
                    <p>Then, use the rectangle tool to bound the area where the parking area will be calculated.</p>
                    <video width="100%" autoPlay loop>
                        <source src='./videos/Step_2.mov'></source>
                    </video>
                </div>
                <div className='carousel-card'>
                    <p>Finally, click calculate!</p>
                    <video width="100%" autoPlay loop>
                        <source src='./videos/Step_3.mov'></source>
                    </video>
                </div>
            </Carousel>
        </Dialog>
    );
}