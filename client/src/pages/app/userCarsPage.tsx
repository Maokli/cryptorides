import React, { useEffect, useState } from 'react';
import { getUserToken } from '../../helpers/auth.helpers';
import { Box, Button, Typography } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import debouncedFilters from './browse-cars.page';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import OwnerCarGrid from '../../components/owner-car-grid.component';
import nocars from '../../assets/images/nocars.jpg';

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
      downPayment,
      images {url}
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginX: '30px' }}>
        <Typography variant="h4" sx={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF', textAlign: 'center' }}>My Cars</Typography>
        <Button sx ={{backgroundColor :'#0CC0DF',  width : 200 , height : 100 , marginTop : 2}} variant="contained" onClick={handleAddCarClick}>
          <AddIcon /> Add Car
        </Button>
      </Box>
      {userCars.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <img src={nocars} alt="No Cars" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      ) : (
        <OwnerCarGrid cars={userCars} />
      )}
    </>
  );
}

export default BrowseUserCars;
