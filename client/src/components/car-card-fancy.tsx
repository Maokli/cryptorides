import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Carousel from './carousel.component';
import { Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Car } from '../models/car.model';

export default function FancyCarCard(props: {car: Car}) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px', fontFamily: 'monument-extended' }}> {/* Setting font to monument extended */}
            <Card sx={{ width: 300, height: 500, backgroundColor: '#1E1E1E', borderRadius: '8px', boxShadow: '0px 0px 10px 0px white', mt: '-10px', border: '1px solid #929293' }}>
                <Carousel images={props.car.images}></Carousel>
                <CardContent sx={{ textAlign: 'center' }}> {/* Centering the content */}
                    <Typography variant="h5" sx={{ color: '#929292', fontWeight: 'bold', textAlign: 'center', mt: '20px' }}> {/* Setting color to #929292 */}
                        {props.car.brand}
                    </Typography>
                    <Typography sx={{ color: '#929292', textAlign: 'center' }}> {/* Setting color to #929292 */}
                        <PeopleIcon sx={{ color: '#929292', mr: 1 }} /> {/* Setting color to #929292 */}
                        {props.car.seats} seats
                    </Typography>
                    <Typography sx={{ color: '#929292', textAlign: 'center' }}> {/* Setting color to #929292 */}
                        <LocalGasStationIcon sx={{ color: '#929292', mr: 1 }} /> {/* Setting color to #929292 */}
                        {props.car.fuelType}
                    </Typography>
                    <Typography sx={{ color: '#929292', textAlign: 'center', mt: '20px' }}> {/* Setting color to #929292 */}
                        {props.car.rentalPrice} DT
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
