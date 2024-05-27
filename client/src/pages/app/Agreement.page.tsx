import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../../components/sidebar';
import {Chat} from '../../components/chat';
import { useParams } from 'react-router-dom';
import axios from '../../helpers/axios.helpers';
import AgreementRightSide from '../../components/agreement-right-side';

const AgreementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rentalRequest, setRentalRequest] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      console.error("No rental request ID provided");
      return;
    }

    const fetchRentalRequest = async () => {
      try {
        const query = `
        query GetRentalRequest($requestid: Float!) {
          getRentalRequests(requestid: $requestid) {
            id
            status
            fromdate
            todate
            ownerId
            renterId
            createdAt
            car {
              id,
              location,
              brand,
              color,
              title,
              fuelType,
              seatsNumber,
              rentalPrice,
              downPayment
            }
          }
        }
        `;

        const variables = { requestid: parseFloat(id) };
        const response = await axios.instance.post("http://localhost:3001/graphql", { query, variables });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        setRentalRequest(response.data.data.getRentalRequests);
      } catch (error) {
        console.error("Error fetching rental request:", error);
      }
    };

    fetchRentalRequest();
  }, [id]);

  const handleStatusUpdate = async (newStatus: 'Approved' | 'Denied') => {
    try {
      const mutation = `
        mutation UpdateStatusRentalRequest($requestid: Float!, $input: UpdateRentalRequestInput!) {
          updateStatusRentalRequest(requestid: $requestid, input: $input)
        }
      `;

      const variables = {
        requestid: parseFloat(id!),
        input: { newStatus }
      };

      await axios.instance.post("http://localhost:3001/graphql", { mutation, variables });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={6}>
          <Box height="100%" padding={2}>
            {rentalRequest && (
              <Chat recipientId={rentalRequest.ownerId} onLogout={() => { }} />
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          {rentalRequest && (
            <AgreementRightSide rentalRequest={rentalRequest} onStatusUpdate={handleStatusUpdate} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgreementPage;
