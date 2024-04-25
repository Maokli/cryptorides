import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import landing from '../../assets/images/landing.png';
import BasicDateTimeRangePicker from '../../components/calender';
import VehiculeFleet from '../../components/vehiculeFleet';
import { Link as ScrollLink , Element } from 'react-scroll';
import { Car } from '../../models/car.model';


const images = [
    {
        url:
            'https://i.ytimg.com/vi/1HAACt8gmE0/maxresdefault.jpg',
        },
      {
        url:
          'https://fdm.dk/sites/default/files/d6images/07-bpv-toyotagt86-002.jpg',
    },{
        url : '../'
    }
]
const cars: Car[] = [
    {
      id: 1,
      location: "New York",
      brand: "Range",
      color: "Blue",
      title: "The Range",
      fuelType: "Petrol",
      seats: 5,
      rentalPrice: 500,
      downPayment: 1000,
      images: images
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
            <Element name ="Home" id="home">
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
                < BasicDateTimeRangePicker/>
                </Element>
                <Element name='fleet' id='fleet'>
                    < VehiculeFleet cars={cars}/>
                </Element>
                <Element name='aboutUs' id='about' >
                    <Typography variant="h2" gutterBottom id="about">
                        About Us Section
                    </Typography>
                    <Box sx={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
                        {/* Content for About Us section */}
                    </Box>
                </Element>
                <Element name ="advantages" id="advantages">
                    <Typography variant="h2" gutterBottom id="advantages">
                        Advantages Section
                    </Typography>
                    <Box sx={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
                        {/* Content for Advantages section */}
                    </Box>
                </Element>
                <Element name ="rental-conditions" id="rental-conditions">
                    <Typography variant="h2" gutterBottom id="rental-conditions">
                        Rental Conditions Section
                    </Typography>
                    <Box sx={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
                        {/* Content for Rental Conditions section */}
                    </Box>
                </Element>
                <Element name ="reviews" id="reviews">
                <Typography variant="h2" gutterBottom id="reviews">
                    Reviews Section
                </Typography>
                <Box sx={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
                    {/* Content for Reviews section */}
                </Box>
                </Element>

                <Element name ="news" id="news">

                <Typography variant="h2" gutterBottom id="news">
                    News Section
                </Typography>
                <Box sx={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
                    {/* Content for News section */}
                </Box>
                </Element>

                <Element name ="contacts" id="contacts">

                <Typography variant="h2" gutterBottom id="contacts">
                    Contacts Section
                </Typography>
                <Box sx={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
                    {/* Content for Contacts section */}
                </Box>
                </Element>

                <Typography variant="h2" gutterBottom id="login">
                    Login Section
                </Typography>
                <Box sx={{ height: '200vh', backgroundColor: '#f0f0f0' }}>
                    {/* Content for Login section */}
                </Box>
        </div>
    );
};

export default LandingPage;