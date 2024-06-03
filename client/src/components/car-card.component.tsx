import React, { FormEvent, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Carousel from './carousel.component';
import { Box, Button, Icon, IconButton, Stack } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Car } from '../models/car.model';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from '../helpers/axios.helpers';

export default function CarCard(props: {car: Car, reloadTrigger?: boolean, setReloadTrigger?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const navigate = useNavigate();
  const [isLiked, setLiked] = useState(false); 

  useEffect(() => {
    const fetchLikedState = async () => {
      const query = `
      query GetLikedState($carId: Float!) {
        LikedState(carId: $carId)
      }
      `;
      const variables = {carId: props.car.id};
      try {
        const response = await axios.instance.post("", {
          query,
          variables,
        });
        setLiked(response.data.data.LikedState );        
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikedState();
  }, [props.car.id]);

  const handleLike = async (carId: number) => {
    const query =  `
    mutation AddLikedCar($carId: Float!){
      AddLikedCar(carId: $carId) {
        carsLikedByUser{
          id
        }
      }
    }
    `;
    const variables = {carId: carId};
    try {
      const response = await axios.instance.post("", {
        query,
        variables,
      });
      setLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async (carId: number) => {
    const query =  `
    mutation RemoveLikedCar($carId: Float!) {
      RemoveLikedCar(carId: $carId) {
        carsLikedByUser {
          id
        }
      }
    }
    `;
    const variables = {carId: carId};
    try {
      const response = await axios.instance.post("", {
        query,
        variables,
      });      
      setLiked(!isLiked);
      if (props.setReloadTrigger) {
        props.setReloadTrigger(!props.reloadTrigger);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card sx={{ width: 300, borderRadius: 10, paddingY: 1, boxShadow: 2 }}>
       
       <CardHeader 
        title={props.car.brand.toUpperCase() }
        titleTypographyProps={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '0.9rem', textAlign: 'center' }}
        action={
          <IconButton onClick={isLiked ? () => handleUnlike(props.car.id) : () => handleLike(props.car.id)}>
            <FavoriteIcon color={isLiked ? "secondary" : "disabled"} />
          </IconButton>
        }
      />
      <CardMedia
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
          marginTop={1}
        >
          {/* Adjusted typography styles */}
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Icon>
              <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
                <PlaceIcon fontSize="small" />
              </Typography>
            </Icon>
            <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
              {props.car.location}
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary">
            <Icon>
              <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
                <PeopleIcon fontSize="small" />
              </Typography>
            </Icon>
            <Typography color="text.secondary" variant="body2" sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem' }}>
              {props.car.seatsNumber} People
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary">
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
            <Typography color="text.primary" variant='subtitle1' sx={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color : 'grey' }} gutterBottom>
              <span style={{ fontWeight: 'bold' }}>{props.car.downPayment}</span> TND 
              <Typography component="span" color="text.secondary" variant='body2' sx={{ fontFamily: 'Montserrat' }} gutterBottom> deposit</Typography>
            </Typography>
          </Stack>
          <Button variant='contained' sx={{ width: '60px', height: '30px' }}
            onClick={() => navigate(`/details/${props.car.id}`)}>
             RENT
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
