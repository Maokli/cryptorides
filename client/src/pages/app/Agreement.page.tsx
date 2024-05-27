import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/sidebar';
import { Chat } from '../../components/chat';
import { useParams } from 'react-router-dom';
import axios from '../../helpers/axios.helpers';
import AgreementRightSide from '../../components/agreement-right-side';

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
              createdAt
              car {
                id
                make
                model
                year
                rentalPrice
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
      // Optionally, update the state or display a success message
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Box flexGrow={1} padding={2}>
          <Chat onLogout={() => {}} />
        </Box>
        {rentalRequest && (
          <AgreementRightSide rentalRequest={rentalRequest} onStatusUpdate={handleStatusUpdate} />
        )}
      </Box>
    </Box>
  );
};

export default AgreementPage;
