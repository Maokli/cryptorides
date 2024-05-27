import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from './../helpers/axios.helpers';
import { getUserToken } from '../helpers/auth.helpers';
import { notifyPaymentError } from '../helpers/toast.helpers'; 


interface PayButtonProps {
  requestId: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

const PayButton: React.FC<PayButtonProps> = ({ requestId, onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const token = getUserToken();
        const checkStatusQuery = `
          query CheckPaymentStatus($requestId: Float!) {
            getRentalRequests(requestid: $requestId) {
              id
              status
            }
          }
        `;
        const checkStatusVariables = { requestId: parseFloat(requestId.toString()) };

        const checkStatusResponse = await axios.instance.post(
          "http://localhost:3001/graphql",
          {
            query: checkStatusQuery,
            variables: checkStatusVariables
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (checkStatusResponse.data.errors) {
          throw new Error(checkStatusResponse.data.errors[0].message);
        }

        const rentalRequest = checkStatusResponse.data.data.getRentalRequests;
        if (rentalRequest.status === "Paid") {
          setPaymentStatus("already paid");
        } else {
          setPaymentStatus(null);
        }
      } catch (error) {
        //console.error("Error checking payment status:", error);
        notifyPaymentError("Error checking payment status. Please try again.");

      }
    };

    checkPaymentStatus();
  }, [requestId]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const token = getUserToken();
      const payProcessQuery = `
        query PayProcess($requestId: Float!) {
          payProcess(request: $requestId)
        }
      `;
      const payProcessVariables = { requestId: parseFloat(requestId.toString()) };

      const payResponse = await axios.instance.post(
        "http://localhost:3001/graphql",
        {
          query: payProcessQuery,
          variables: payProcessVariables
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (payResponse.data.errors) {
        throw new Error(payResponse.data.errors[0].message);
      }

      onSuccess(payResponse.data.data.payProcess);
    } catch (error) {
      console.error("Payment error:", error);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="primary"
      disabled={isLoading || paymentStatus === "already paid"}
    >
      {isLoading ? <CircularProgress size={24} /> : paymentStatus === "already paid" ? 'Already Paid' : 'Pay Now'}
    </Button>
  );
};

export default PayButton;
