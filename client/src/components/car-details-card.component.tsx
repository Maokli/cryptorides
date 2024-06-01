import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Car } from '../models/car.model';
import RentCarModal from './rent-car-modal.component';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme with Montserrat font
const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

const CarDetailsCard = (props: { car: Car }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const onBack = () => {
        navigate('/browse');
    }

    const onRentCar = () => {
        setOpen(true);
    }

    return (
        <ThemeProvider theme={theme}>
            <Card 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: "inherit", 
                    margin: '20px', 
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' 
                }}
            >
                <RentCarModal open={open} setOpen={setOpen} car={props.car} />
                <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                        {props.car.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {[...Array(4)].map((_, index) => (
                            <StarIcon key={index} sx={{ color: '#FFD700' }} />
                        ))}
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            440+ Reviewer
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                        If you like this car, proceed to send a rental request to the owner, you will then be redirected to chat to be interviewed. Once the owner approves your rental request, you can proceed to pay the rent and pickup the vehicle. 
                        <br></br>A down payment of{' '}
                        <Typography variant='body2' fontWeight={900} component="span" display="inline">
                            {props.car.downPayment} TND + {props.car.rentalPrice} x number of days
                        </Typography>{' '}
                        will be subtracted from your account immediately.
                    </Typography>

                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Type Car</Typography>
                            <Typography variant="body1">{`${props.car.color} ${props.car.brand}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Capacity</Typography>
                            <Typography variant="body1">{props.car.seatsNumber} Person(s)</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Fuel Type</Typography>
                            <Typography variant="body1">{props.car.fuelType}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Pickup location</Typography>
                            <Typography variant="body1">{props.car.location}</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {`${props.car.rentalPrice} TND`} /day
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button onClick={onBack} variant="outlined" color="primary">
                            Back
                        </Button>
                        <Button onClick={onRentCar} variant="contained" color="primary">
                            Rent Now
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}

export default CarDetailsCard;
