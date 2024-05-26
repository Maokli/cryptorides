import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import landing from '../../assets/images/landing.png';
import BasicDateTimeRangePicker from '../../components/calender';
import VehiculeFleet from '../../components/vehiculeFleet';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Car } from '../../models/car.model';
import LoginForm from '../../components/loginForm';
import CarRentalConditions from '../../components/CarRentalConditions';
import CustomerReviews from '../../components/CustomerReviews';
import CompanyContacts from '../../components/CompanyContacts';

const images = [
    {
        url:
            'https://i.ytimg.com/vi/1HAACt8gmE0/maxresdefault.jpg',
    },
    {
        url: 'https://image.similarpng.com/very-thumbnail/2020/09/Red-car-on-transparent-background-PNG.png'
    }, {
        url: '../'
    },

]
const cars: Car[] = [
    {
        id: 1,
        location: "Ariana",
        brand: "Range Rover",
        color: "Black",
        title: "The Range",
        fuelType: "Petrol",
        seatsNumber: 5,
        rentalPrice: 500,
        downPayment: 1000,
        images: [{
            url: 'https://i.pinimg.com/564x/e6/18/95/e61895017e0e7cc5f152f66983973b41.jpg',

        },
        { url: 'https://p7.hiclipart.com/preview/898/590/426/5bbe05178f45d.jpg' }
        ]
    }
    , {
        id: 2,
        location: "Ariana",
        brand: "Rolls Royce ",
        color: "Blue",
        title: "Rolls Royce Phantom",
        fuelType: "Petrol",
        seatsNumber: 5,
        rentalPrice: 600,
        downPayment: 1000,
        images: [
            { url: 'https://i.pinimg.com/736x/e4/9c/21/e49c21d695d2a6deb28047ea40df5dde.jpg' },
            { url: 'https://w0.peakpx.com/wallpaper/775/215/HD-wallpaper-rolls-royce-ghost-black-edge-ford-gold-motor-mustang-original-phantom-roll.jpg' }
        ]

    }
    ,
    {
        id: 3,
        location: "Ariana",
        brand: "Range",
        color: "Blue",
        title: "The Range",
        fuelType: "Petrol",
        seatsNumber: 5,
        rentalPrice: 500,
        downPayment: 1000,
        images: [
            { url: 'https://p7.hiclipart.com/preview/617/294/471/2018-bmw-3-series-bmw-x5-car-bmw-1-series-bmw.jpg' },
            { url: 'https://i.pinimg.com/736x/bc/26/f8/bc26f86570bd38c857eb255457d26632.jpg' }
        ]
    }
]


interface SectionBoxProps {
    children: ReactNode;
}

const SectionBox: React.FC<SectionBoxProps> = ({ children }) => (
    <Box sx={{ py: 4, height: '100vh', overflowY: 'auto' }}>
        {children}
    </Box>
);

const LandingPage: React.FC = () => {

    return (
        <div>

            <Navbar />
            <Element name="Home" id="home">
                <SectionBox>
                    <Grid container spacing={2} sx={{ height: '100%' }}>
                        <Grid item xs={12} md={6} sx={{ padding: 10, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <Paper sx={{ p: 2, backgroundColor: '#000000' }}>
                                <Typography variant="h4" sx={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF', textAlign: 'center' }}>
                                    <span style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>CAR RENTAL</span> WITH CONVINIENCE AND SECURITY
                                </Typography>
                                <Typography variant="body1" sx={{ padding: 5, fontFamily: 'Montserrat-Regular', color: '#FFFFFF', textAlign: 'center', mb: 2, mt: 1 }}>
                                    The best conditions for renting a car from our
                                    company with delivery and a full insurance package
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Button variant="contained" sx={{ backgroundColor: '#0CC0DF', color: '#FFFFFF', textTransform: 'none', fontSize: '1.2rem', width: 'calc(50% - 8px)', maxWidth: '250px', padding: '0.8rem 1.5rem', marginRight: '90px' }}>
                                        Rent Now
                                    </Button>
                                    <Button variant="outlined" sx={{ color: '#0CC0DF', borderColor: '#0CC0DF', textTransform: 'none', fontSize: '1.2rem', width: 'calc(50% - 8px)', maxWidth: '250px', padding: '0.8rem 1.5rem', marginLeft: '-30px' }}>
                                        Learn More
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                        {/* Right Side - Image */}
                        <Grid item xs={12} md={6} sx={{ position: 'relative', padding: 10, display: 'flex', justifyContent: 'flex-end', overflow: 'hidden', height: '100%' }}>
                            <img src={landing} alt="Car" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Grid>
                    </Grid>
                </SectionBox>
            </Element>
            <Element name='time' id='time'>
                < BasicDateTimeRangePicker />
            </Element>
            <Element name='fleet' id='fleet'>
                < VehiculeFleet cars={cars} />
            </Element>

            <Element name="rental-conditions" id="rental-conditions">
                <CarRentalConditions />
            </Element>
            <Element name="reviews" id="reviews">
                <CustomerReviews />
            </Element>



            <Element name="contacts" id="contacts">
                <CompanyContacts />
            </Element>

        </div>
    );
};

export default LandingPage;