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

export default function OwnerCarCard(props: { car: Car }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 300, height: 400, borderRadius: 10, paddingY: 1, boxShadow: 2  , marginLeft : 10}}>
      <CardHeader
        title={props.car.title}
        titleTypographyProps={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '0.9rem', textAlign: 'center' }}
      />
      <CardMedia
        sx={{
          width: 200,
          height: 70,
          margin: 'auto',
          '& .MuiBox-root.css-1tnsptx': {
            width: '100%',
            height: '100%',
            borderRadius: 10,
            marginLeft: 'auto'
          },
        }}
      >
        <Carousel images={props.car.images}></Carousel>
      </CardMedia>
      <CardContent>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          spacing={2}
          marginTop={12}
        >
          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ marginTop: '15px' }}>
            <Icon>
              <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
                <PlaceIcon fontSize="small" />
              </Typography>
            </Icon>
            <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
              {props.car.location}
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary" sx={{ marginTop: '8px' }}>
            <Icon>
              <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
                <PeopleIcon fontSize="small" />
              </Typography>
            </Icon>
            <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
              {props.car.seatsNumber} People
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary" sx={{ marginTop: '8px' }}>
            <Icon>
              <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
                <LocalGasStationIcon fontSize="small" />
              </Typography>
            </Icon>
            <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
              {props.car.fuelType}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" width="100%" paddingX={2} alignItems="center" justifyContent="space-between">
          <Stack direction="column" alignItems="start">
            <Typography color="text.primary" variant='h6' sx={{ fontFamily: 'Montserrat', fontSize: '0.9rem' }} gutterBottom>
              <span style={{ fontWeight: 'bold' }}>{props.car.rentalPrice}</span> TND
              <Typography component="span" color="text.secondary" variant='body2' sx={{ fontFamily: 'Montserrat' }} gutterBottom> /day</Typography>
            </Typography>
            <Typography color="text.primary" variant='subtitle1' sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: 'grey' }} gutterBottom>
              <span style={{ fontWeight: 'bold' }}>{props.car.downPayment}</span> TND
              <Typography component="span" color="text.secondary" variant='body2' sx={{ fontFamily: 'Montserrat' }} gutterBottom> deposit</Typography>
            </Typography>
          </Stack>
          <Button variant='contained' sx={{ width: '60px', height: '30px' }}
            onClick={() => navigate(`/update/${props.car.id}`)}>
            Edit
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
