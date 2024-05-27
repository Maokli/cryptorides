import React, { useEffect, useState } from 'react';
import { getUserToken } from '../../helpers/auth.helpers';
import { Box, Typography } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import debouncedFilters from './browse-cars.page'
import OwnerCarGrid from '../../components/owner-car-grid.component';
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
        downPayment , 
        images {url} 
    }
  }
`;


function BrowseUserCars() {
  const [userCars, setCars] = useState([])
  const fetchdata = async () => {

    const token = getUserToken();
    try {
      const response = await axios.instance.post(
        "http://localhost:3001/graphql",
        {
          query,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      console.log(response.data.data) ; 
      setCars(response.data.data.userCars);
    }
    catch {
      console.log("error")
    }

  }
  useEffect(() => {
    fetchdata();
  }, [debouncedFilters]);

  return (
    <>
      <Box sx={{ pt: 3, pl: 3 }}>
        <Typography variant="h3">My Cars : </Typography>
        <OwnerCarGrid cars={userCars}></OwnerCarGrid>
      </Box>
    </>
  );
}

export default BrowseUserCars;
