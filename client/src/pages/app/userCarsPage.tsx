import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { getUserToken } from '../../helpers/auth.helpers';
import { Box, Button, Typography } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import debouncedFilters from './browse-cars.page';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

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

function BrowseUserCars() {
  const [userCars, setCars] = useState([]);
  const navigate = useNavigate();

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
      setCars(response.data.data.userCars);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, [debouncedFilters]);

  const handleAddCarClick = () => {
    navigate('/add');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3">My Cars</Typography>
        <Button color="primary" variant="contained" onClick={handleAddCarClick} sx={{marginRight: '1vw'}}>
          <AddIcon></AddIcon>
          Add Car
        </Button>
      </Box>
      <CarGrid cars={userCars}></CarGrid>
    </>
  );
}

export default BrowseUserCars;
