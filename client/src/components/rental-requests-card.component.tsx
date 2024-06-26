import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Carousel from './carousel.component';
import { Button, Icon, Stack } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Car } from '../models/car.model';
import { useNavigate } from 'react-router-dom';
import { rentalRequestDto } from '../models/rental-request.model';
import { statusRequest } from '../models/request-status.enum';
const colors = {
  [statusRequest.Waiting]: "#f09500",
  [statusRequest.Approved]: "#00f088",
  [statusRequest.Cancelled]: "#d9004c",
  [statusRequest.Paid]: "#00f088",
}
export default function RentalRequestCard(props: {rentalRequest: rentalRequestDto}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 400, paddingY: 2, boxShadow: 2 }}>
      <CardHeader
        title={props.rentalRequest.car.title}
      />
      <CardMedia>
      <Carousel images={props.rentalRequest.car.images}></Carousel>
      </CardMedia>
      <CardContent>
        <Stack width="100%" direction="row" alignItems="center" justifyContent="space-around">
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Icon>
              <Typography color="text.secondary">
                <PlaceIcon></PlaceIcon>
              </Typography>
            </Icon>
            <Typography color="text.secondary">
                {props.rentalRequest.car.location}
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary">
            <Icon>
              <Typography color="text.secondary">
                <PeopleIcon></PeopleIcon>
              </Typography>
            </Icon>
            <Typography color="text.secondary">
                {props.rentalRequest.car.seatsNumber} People
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary">
            <Icon>
              <Typography color="text.secondary">
                <LocalGasStationIcon></LocalGasStationIcon>
              </Typography>
            </Icon>
            <Typography color="text.secondary">
                {props.rentalRequest.car.fuelType}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" width="100%" paddingX={2} alignItems="center" justifyContent="space-between">
          <Stack direction="column" alignItems="start">
            <Typography color="text.primary" variant='h5' fontWeight="900" gutterBottom>
              {props.rentalRequest.car.rentalPrice} TND/
              <Typography component="span" color="text.secondary" variant='h6' gutterBottom>day</Typography>
            </Typography>
            <Typography color="text.primary" variant='subtitle1' fontWeight="900" gutterBottom>
              {props.rentalRequest.car.downPayment} TND 
              <Typography component="span" color="text.secondary" variant='subtitle1' gutterBottom> deposit</Typography>
            </Typography>
          </Stack>
          <Typography fontWeight={900} paddingX={3} paddingY={1} sx={{color: "white", backgroundColor: colors[props.rentalRequest.status]}} >
              {props.rentalRequest.status}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
}