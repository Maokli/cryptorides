import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { getUserToken } from '../../helpers/auth.helpers';
import { Box, Typography } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import debouncedFilters from './browse-cars.page'
import RentalRequestsList from '../../components/rentalRequest-list';
import { gql } from '@apollo/client';
import { decode } from 'jsonwebtoken';
const query = `
  query getAllRentalsRequests($getAllRequest: getRentalRequestInput!) {
    getAllRentalsRequests(getAllRequest: $getAllRequest) {
      userId
      userRole
    }
  }
`;

function BrowseUserRentalRequests() {
    const fetchdata = async () => {

        const token = getUserToken();
        let variables = {
            getAllRequest: {
              userId : 1,
              userRole: "owner"
            }
        }

        try {
          const response = await axios.instance.post(
            "http://localhost:3001/graphql",
            {
                query   ,
            },
            {
              headers: {
                Authorization: `Bearer ${getUserToken()}`,
              },
            }
          );
          console.log(response.data.data) ; 
        }
        catch {
          console.log("error")
        }
    
      }
  return (
        <Box sx={{ pl : 3}}> 
        < RentalRequestsList rentalrequest={[]} cars={[]} />
      </Box>
    );
}

export default BrowseUserRentalRequests;
