import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from '../helpers/axios.helpers';
import { getUserToken } from '../helpers/auth.helpers';

interface SendRentalRequestButtonProps {
  carId: number;
  availabilityFrom: Date;
  availabilityTo: Date;
  ownerId: number;
  renterId: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

const SendRentalRequestButton: React.FC<SendRentalRequestButtonProps> = ({
    carId,
    availabilityFrom,
    availabilityTo,
    ownerId,
    renterId,
    onSuccess,
    onError
  }) => {
  
    const handleClick = async () => {
  
      try {
        const token = getUserToken();
        const query = `
        query ValidateRentalrequest($input: rentalRequestInput!) {
          validateRentalrequest(request: $input) {
            id
            fromdate
            todate
            status
            ownerId
            renterId
            createdAt
            car {id}
          }
        }
        `;
        const variables = {
          input: {
            carId,
            availabilityFrom,
            availabilityTo,
            ownerId,
            renterId
          }
        };
  
        const response = await axios.instance.post(
          "http://localhost:3001/graphql",
          { query, variables },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = response.data;
        onSuccess(data);
      } catch (error) {
        onError(error);
      }
    };
  
    return (
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
      ></Button>
    );
  };
  
  export default SendRentalRequestButton;