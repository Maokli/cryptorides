import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import AudiImage from '../assets/images/blueRange.png';
import { IoCarSport } from "react-icons/io5";
import { RiContractLine } from "react-icons/ri";
import { MdCarRental } from "react-icons/md";
import { FaHandshake, FaMoneyCheckAlt } from "react-icons/fa";

const AboutUs: React.FC = () => {
    return (
        <Grid container spacing={2} direction="row" justifyContent="space-between">
            <Grid item xs={12} md={6} lg={6} xl={6} >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: '100vh',
                        backgroundColor: '#000000',
                        padding: '20px',
                        ml: 10
                    }}
                >
                    <Typography variant="h4" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat', marginBottom: '10px', fontWeight: 'bold', marginLeft: '50px', fontSize: '18px' }}>
                        A WIDE SELECTION OF CARS
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <IconButton
                            style={{
                                backgroundColor: '#1E1E1E',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                marginRight: '10px',
                                border: '1px solid #929293',
                            }}
                        >
                            <IoCarSport style={{ fontSize: '24px' }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 'bold', }}>
                            We have various brands and models <br /> of cars in our assortment
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat', marginTop: '20px', fontWeight: 'bold', marginLeft: '50px', fontSize: '18px' }}>
                        TRANSPARENT RENTAL CONDITIONS
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <IconButton
                            style={{
                                backgroundColor: '#1E1E1E',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                marginRight: '10px',
                                border: '1px solid #929293',
                            }}
                        >
                            <RiContractLine style={{ fontSize: '24px' }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 'bold', }}>
                            We have no hidden commissions, everything <br /> is clear and understandable
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat', marginTop: '20px', fontWeight: 'bold', marginLeft: '50px', fontSize: '18px' }}>
                        QUALITY OF SERVICE
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <IconButton
                            style={{
                                backgroundColor: '#1E1E1E',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                marginRight: '10px',
                                border: '1px solid #929293',
                            }}
                        >
                            <MdCarRental style={{ fontSize: '24px' }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 'bold', }}>
                            We monitor the technical condition of cars and <br /> ensure their cleanliness and comfort for you
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat', marginTop: '20px', fontWeight: 'bold', marginLeft: '50px', fontSize: '18px' }}>
                        CUSTOMER SUPPORT
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <IconButton
                            style={{
                                backgroundColor: '#1E1E1E',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                marginRight: '10px',
                                border: '1px solid #929293',
                            }}
                        >
                            <FaHandshake style={{ fontSize: '24px' }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 'bold', }}>
                            Our team is ready to help you 24/7 to ensure <br /> maximum comfort and safety
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat', marginTop: '20px', fontWeight: 'bold', marginLeft: '50px', fontSize: '18px' }}>
                        CONVENIENCE
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <IconButton
                            style={{
                                backgroundColor: '#1E1E1E',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                marginRight: '10px',
                                border: '1px solid #929293',
                            }}
                        >
                            <FaMoneyCheckAlt style={{ fontSize: '24px' }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 'bold', }}>
                            The process of renting a car with us is very <br /> simple and takes a minimum of time
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}  mt ={10}>
                <Typography variant="h4" sx={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold', textTransform: 'uppercase', color: '#FFFFF', textAlign: 'center' }}>
                    <span style={{ color: '#0CC0DF', fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>WE ARE PROFESSIONAL </span> IN THE FIELD OF CAR RENTAL
                </Typography>
                <Typography variant="body1" sx={{ padding: 5, fontFamily: 'Montserrat-Regular', color: '#FFFFFF', textAlign: 'center', mb: 2, mt: 1 }}>
                    Learn more about our company and why we
                    are a reliable car rental partner
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        mt : '-200px'
                    }}
                >
                    <img src={AudiImage} alt="Audi" style={{ width: '80%', maxWidth: '600px', borderRadius: '8px' , marginTop : '-10px' }} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default AboutUs;
