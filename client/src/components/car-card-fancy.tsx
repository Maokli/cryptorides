import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Carousel from './carousel.component';
import { Box, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Car } from '../models/car.model';

export default function FancyCarCard(props: {car: Car}) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
        <Card sx={{ width: 300, height: 500, backgroundColor: '#1E1E1E', borderRadius: '8px', boxShadow: '0px 0px 10px 0px white', mt: '-10px', border: '1px solid #929293' }}>
            <Carousel images={props.car.images}></Carousel>
            <CardContent>
                <Typography variant="h5" sx={{ color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold', textAlign: 'center', mt: '20px' }}>
                    {props.car.brand}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <Stack direction="row" alignItems="center">
                        <PeopleIcon sx={{ color: 'white' }} />
                        <Typography sx={{ color: 'white' }}> {props.car.seatsNumber} seats </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <Stack direction="row" alignItems="center">
                        <LocalGasStationIcon sx={{ color: 'white' }} />
                        <Typography sx={{ color: 'white' }}> {props.car.fuelType}</Typography>
                    </Stack>
                </Stack>
                <Typography sx={{ color: 'white', textAlign: 'center', mt: '20px' }}>{props.car.rentalPrice} DT</Typography>
              </CardContent>
        </Card>
        </Box>
    );
}
