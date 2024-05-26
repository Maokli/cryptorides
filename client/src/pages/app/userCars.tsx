import React, { useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { Car } from '../../models/car.model';
import { gql, useMutation, useQuery } from '@apollo/client';
import { getUserToken } from '../../helpers/auth.helpers';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const query = `
  query GetUserCars {
    userCars {
        id , 
        location , 
        brand , 
        color , 
        title , 
        fuelType , 
        rentalPrice , 
        downPayment
    }
  }
`;
const images = [
    {
      url:
        'https://www.turbo.fr/sites/default/files/migration/test/field_image/000000005301416.jpg',
    },
    {
      url:
        'https://fdm.dk/sites/default/files/d6images/07-bpv-toyotagt86-002.jpg',
    },
    {
      url:
        'https://www.topspeed.sk/userfiles/articles/10-12/11605/1481385478-toyota.gt86.jpg',
    },
    {
      url:
        'https://editorial.pxcrush.net/carsales/general/editorial/161214_toyota_86_gt_ii_01-j01q.jpg?width=1024&height=682',
    },
  ];

function BrowseUserCars() {
  const [userCars, setUserCars] = useState<Car[]>([]);
  const fetchData = async () => {
    const token = getUserToken();
    console.log(token) ; 
    const response = await axios.post(
      "http://localhost:3001/graphql",
      {
        query , 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let userCars: Car[] = response.data.data.userCars;
    const uc = (userCars: any[]) => {
      return userCars.map((car: any) => ({
          ...car,
          seats: 0 , 
          images : images       
      }));
     }
     console.log(uc(userCars)) ; 
     setUserCars(uc(userCars)) ; 
    console.log(response.data.userCars) ; 
    if (response.data.Loading) return <p>Loading...</p>;
    if (response.data.error) return <p>Error: {response.data.error.message}</p>;

    }
    fetchData() ; 

    return (
      <>
      <Box sx={{pt : 3 , pl : 3}}>
        <Typography variant="h3">My Cars : </Typography>
        <CarGrid cars={userCars}></CarGrid>
      </Box>
      </>
    );
}

export default BrowseUserCars;
