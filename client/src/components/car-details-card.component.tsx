// src/components/CarCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import mercedes from '../assets/images/mercedes.png'
import { Car } from '../models/car.model';
import RentCarModal from './rent-car-modal.component';

const CarDetailsCard = (props: {car: Car}) => {
    const [open, setOpen] = useState(false);
    const onRentCar = () => {
        setOpen(true);
    }
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: "inherit"}}>
            <RentCarModal open={open} setOpen={setOpen} downPayment={props.car.downPayment} rentalPrice={props.car.rentalPrice}/>
            <CardContent>
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
                  If you like this car, proceede to send a rental request to the owner, you will then interviewed via chat.
                  <br></br>Once the owner approves of you, you can proceed to pay the rent and pickup the vehicule.
                  <br></br>A down payment of <Typography variant='body2' fontWeight={900}>{props.car.downPayment} TND + {props.car.rentalPrice} x number of days will be substracted from your account immidiately.</Typography>
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Type Car</Typography>
                        <Typography variant="body1">{`${props.car.color} ${props.car.brand}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Capacity</Typography>
                        <Typography variant="body1">{props.car.seats} Person</Typography>
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
                    {`${props.car.rentalPrice} TND`}/ day
                </Typography>
                <Button onClick={onRentCar} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Rent Now
                </Button>
            </CardContent>
        </Card>
    );
}

export default CarDetailsCard;
