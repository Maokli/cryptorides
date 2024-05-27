import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { Car } from '../../models/car.model';
import { CarFilters } from '../../models/car-filters.model';
import CarFiltersComponent from '../../components/car-filters.component';
import { Box, Container, Grid } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import { getUserToken } from '../../helpers/auth.helpers';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CenterCarFiltersComponent from '../../components/center-car-filters.component';
import CarDetailsCard from '../../components/car-details-card.component';
import CarDetailsCarousel from '../../components/car-details-carousel.component';
import { useParams } from 'react-router-dom';

function CarDetailsPage() {
  const [car, setCar] = useState(undefined as unknown as Car);
  let { id } = useParams();
  
  const getCar = async (id: number) => {
    const query = `
      query car ($id: Int!)
      {
        car(id: $id) {
          id,
          ownerId,
          location,
          brand,
          color,
          title,
          fuelType,
          seatsNumber,
          rentalPrice,
          downPayment,
          images {url}
        }
      }
    `;

    try {
      const response = await axios.instance.post("",
        {
          query,
          variables: {id: id},
        }
      );
      console.log(response);
      setCar(response.data.data.car);
    }
    catch {
      console.log("error")
    }
  }

  useEffect(() => {
    if(id)
      getCar(parseInt(id));
  }, [id]);

  return (
    <Grid container spacing={0.5}>
      <Grid container 
        padding={2}
        justifyContent="center"
        alignItems="center">
        {car &&
          <Box sx={{height: "60vh", width: "30%"}}>
            <CarDetailsCarousel images={car.images}></CarDetailsCarousel>
          </Box>
        }
        {car && 
          <Box sx={{height: "60vh", width: "50%"}}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                  <CarDetailsCard car={car} />
              </Box>
          </Box>
        }
      </Grid>
    </Grid>
  );
}

export default CarDetailsPage;
