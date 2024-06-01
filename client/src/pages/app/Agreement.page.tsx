import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Chat } from '../../components/chat';
import { useParams } from 'react-router-dom';
import axios from '../../helpers/axios.helpers';
import AgreementRightSide from '../../components/agreement-right-side';
import { getUserIdFromToken } from '../../services/account.service';

const AgreementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rentalRequest, setRentalRequest] = useState(null);

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
              images {url}
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

  const [currentUserId, setCurrentUserId] = useState<number>(0);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = (await getUserIdFromToken()) as string;
        setCurrentUserId(parseInt(userId));
        console.log("User ID:", userId);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();
  }, []);

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

      await axios.instance.post("", { query: mutation, variables });
      await axios.instance.post("", { query: mutation, variables });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Grid container>
        <Grid item xs={9}>
          <Box height="100%" padding={2}>
            {rentalRequest && (
              <Box height="100%">
                <Chat recipientId={currentUserId === (rentalRequest as any).ownerId ? (rentalRequest as any).renterId : (rentalRequest as any).ownerId} onLogout={() => { }} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={3}>
          {rentalRequest && (
            <AgreementRightSide rentalRequest={rentalRequest} onStatusUpdate={handleStatusUpdate} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgreementPage;
