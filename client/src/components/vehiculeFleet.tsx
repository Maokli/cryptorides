import React from 'react';
import { Box, Button, Typography, Grid, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Card, CardContent, Stack } from '@mui/material';
import blueCar from '../assets/images/blueRange.png';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import FlashAutoIcon from '@mui/icons-material/FlashAuto';

const VehiculeFleet: React.FC = () => {
    return (
        <Grid container item xs={12} md={6} sx={{ padding: 10, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: '100px',
                    backgroundColor: '#000000', // Set the background color to black
                    padding: '20px', // Add padding for spacing
                }}
            >
                <Grid sx={{ ml: 0 }}>
                    <Typography variant="h4" sx={{ fontFamily: 'Montserrat', color: 'white', textAlign: 'left', mt: -10 }}>
                        WE HAVE <span style={{ color: '#0CC0DF', fontFamily: 'Montserrat', fontWeight: 'bold', textAlign: 'left' }}>A LARGE SELECTION</span>{' '}
                        <br />
                        <span style={{ fontFamily: 'Montserrat', color: 'white', textAlign: 'left' }}>OF CARS FOR RENT</span>
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: 'white', textAlign: 'left', mt: '20px', fontSize: '18px' }}>
                        A wide selection of cars of different brands and classes
                        <br />
                        for your needs and budget
                        all in Montesserrat large
                    </Typography>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px', mb: '20px' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1E1E1E',
                            color: '#0CC0DF',
                            border: '1px solid #0CC0DF',
                            borderRadius: '18px',
                            marginRight: '20px',
                            width: '200px',
                            height: '50px',
                        }}
                    >
                        Economy Class
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1E1E1E',
                            color: '#0CC0DF',
                            border: '1px solid #0CC0DF',
                            borderRadius: '18px',
                            marginRight: '20px',
                            width: '200px',
                            height: '50px',

                        }}
                    >
                        Middle Class
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1E1E1E',
                            color: '#0CC0DF',
                            border: '1px solid #0CC0DF',
                            borderRadius: '18px',
                            marginRight: '20px',
                            width: '200px',
                            height: '50px'
                        }}
                    >
                        Business Class
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#0CC0DF',
                            color: 'white',
                            borderRadius: '18px',
                            width: '200px',
                            height: '50px',
                            marginRight: '20px'
                        }}
                    >
                        Premium Class
                    </Button>

                    <IconButton
                        sx={{
                            backgroundColor: '#1E1E1E',
                            borderColor: '#929293',
                            '&:hover': {
                                backgroundColor: '#0CC0DF',
                            },
                            marginLeft: '100px',
                            marginRight: '20px'
                        }}
                    >
                        <ArrowBackIosNewIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton
                        sx={{
                            backgroundColor: '#1E1E1E',
                            borderColor: '#929293',
                            marginLeft: '10px',
                            marginRight: '20px',
                            '&:hover': {
                                backgroundColor: '#0CC0DF',

                            },
                        }}
                    >
                        <ArrowForwardIosIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Separate Box for the Card component */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
                <Card sx={{ width: 300, height: 500, backgroundColor: '#1E1E1E', borderRadius: '8px', boxShadow: '0px 0px 10px 0px white', mt: '-10px', border: '1px solid #929293' }}>
                    <img src={blueCar} alt="Car" style={{ width: '100%', height: 'auto' }} />
                    <CardContent>
                        <Typography variant="h5" sx={{ color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold', textAlign: 'center', mt: '20px' }}>
                            Range
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                            <Stack direction="row" alignItems="center">
                                <PeopleIcon sx={{ color: 'white' }} />
                                <Typography sx={{ color: 'white' }}>4 people</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <FlashAutoIcon sx={{ color: 'white' }} />
                                <Typography sx={{ color: 'white' }}>Auto</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                            <Stack direction="row" alignItems="center">
                                <LocalGasStationIcon sx={{ color: 'white' }} />
                                <Typography sx={{ color: 'white' }}>Petrol</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <SpeedIcon sx={{ color: 'white' }} />
                                <Typography sx={{ color: 'white' }}>Speed</Typography>
                            </Stack>
                        </Stack>
                        <Typography sx={{ color: 'white', textAlign: 'center', mt: '20px' }}>1-3 days ----------- $400/day</Typography>
                        <Typography sx={{ color: 'white', textAlign: 'center' }}>4-23 days --------- $385/day</Typography>
                        <Typography sx={{ color: 'white', textAlign: 'center' }}>24+ days ----------- $325/day</Typography>
                    </CardContent>
                </Card>
            </Box>

        </Grid>
    );
};

export default VehiculeFleet;
