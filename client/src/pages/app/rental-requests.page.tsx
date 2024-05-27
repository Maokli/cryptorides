import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { CarFilters } from '../../models/car-filters.model';
import CarFiltersComponent from '../../components/car-filters.component';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import { getUserToken } from '../../helpers/auth.helpers';
import CenterCarFiltersComponent from '../../components/center-car-filters.component';
import CarDetailsCard from '../../components/car-details-card.component';
import { getRentalRequestInput } from '../../models/getRentalRequestInput.model';
import { getUserIdFromToken } from '../../services/account.service';
import RentalRequestGrid from '../../components/rental-requests-grid.component';

function RentalRequestsPage() {
  const [rentalRequestsAsOwner, setRentalRequestsAsOwner] = useState([])
  const [rentalRequestsAsRenter, setRentalRequestsAsRenter] = useState([])

  const getRentalRequests = async (role: 'owner' | 'renter') => {
    const query = `
      query getAllRentalsRequests ($getRentalRequestInput: getRentalRequestInput!)
      {
        getAllRentalsRequests(getRentalRequestInput: $getRentalRequestInput) {
          status,
          id,
          car {
            id,
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
      }
    `;

    try {
      const getRentalRequestInput: getRentalRequestInput = {
        userId: parseInt(getUserIdFromToken() ?? "0"),
        userRole: role
      }
      const response = await axios.instance.post("",
        {
          query,
          variables: { getRentalRequestInput: getRentalRequestInput },
        }
      );
      if(role === 'owner')
        setRentalRequestsAsOwner(response.data.data.getAllRentalsRequests);
      else
        setRentalRequestsAsRenter(response.data.data.getAllRentalsRequests);
    }
    catch {
      console.log("error")
    }
  }

  useEffect(() => {
    getRentalRequests('owner');
    getRentalRequests('renter');
  }, []);

  return (
    <Grid spacing={2} padding={2}>
      <Grid item xs={8}>
        <Typography color="black" variant='h3'>
                  Incoming Requests
        </Typography>
        { rentalRequestsAsOwner && rentalRequestsAsOwner.length > 0 && 
          <RentalRequestGrid rentalRequests={rentalRequestsAsOwner}></RentalRequestGrid>
        }
        
        { !rentalRequestsAsOwner || rentalRequestsAsOwner.length === 0 && 
          <Typography color="text.secondary" variant='h5' fontSize={70} gutterBottom> No incoming requests yet</Typography>}
      </Grid>
      <Grid item xs={8}>
        <Typography color="black" variant='h3'>
                  Outgoing Requests
        </Typography>
        { rentalRequestsAsRenter && rentalRequestsAsRenter.length > 0 && 
          <RentalRequestGrid rentalRequests={rentalRequestsAsRenter}></RentalRequestGrid>
        }
        { !rentalRequestsAsRenter || rentalRequestsAsRenter.length === 0 && 
          <Typography color="text.primary" variant='subtitle1' fontWeight="900" gutterBottom> No outgoing requests yet</Typography>}
      </Grid>
    </Grid>

  );
}

export default RentalRequestsPage;
