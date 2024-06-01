import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import axios from './../helpers/axios.helpers';
import { getUserToken } from '../helpers/auth.helpers';
import { notifyPaymentError } from '../helpers/toast.helpers'; 
import PaidIcon from '@mui/icons-material/Paid';


interface PayButtonProps {
  requestId: number;
  isDisabled: boolean;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

const PayButton: React.FC<PayButtonProps> = (props: PayButtonProps) => {
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
        const checkStatusVariables = { requestId: parseFloat(props.requestId.toString()) };

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
        notifyPaymentError("Error checking payment status. Please try again.");

      }
    };

    checkPaymentStatus();
  }, [props.requestId]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const token = getUserToken();
      const payProcessQuery = `
        query PayProcess($requestId: Float!) {
          payProcess(request: $requestId)
        }
      `;
      const payProcessVariables = { requestId: parseFloat(props.requestId.toString()) };

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

      props.onSuccess(payResponse.data.data.payProcess);
    } catch (error) {
      console.error("Payment error:", error);
      props.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip sx={{display: props.isDisabled ? "inline-block" : "none"}} title="You can only pay an approved request">
      <span>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          disabled={props.isDisabled}
          sx={{
            mb: '2%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <PaidIcon sx={{mr: '2%'}}></PaidIcon>
          {isLoading ? <CircularProgress size={24} /> : paymentStatus === "already paid" ? 'Already Paid' : 'Pay Now'}
        </Button>
      </span>
    </Tooltip>
    
  );
};

export default PayButton;
