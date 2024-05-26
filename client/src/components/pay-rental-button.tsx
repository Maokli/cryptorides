import React from 'react';
import Button from '@mui/material/Button';
import { gql, useMutation } from '@apollo/client';

interface PayRentalButtonProps {
  requestId: number;
}

const PAY_RENTAL_MUTATION = gql`
  mutation PayRental($requestId: Int!) {
    payProcess(request: $requestId)
  }
`;

const PayRentalButton: React.FC<PayRentalButtonProps> = ({ requestId }) => {
  const [payRental] = useMutation(PAY_RENTAL_MUTATION, {
    variables: { requestId },
    onError: (error) => {
      console.error('Error during payment:', error);
    },
    onCompleted: (data) => {
      console.log('Payment completed:', data);
    },
  });

  const handlePaymentClick = () => {
    payRental();
  };

  return (
    <Button variant="contained" color="primary" onClick={handlePaymentClick}>
      Pay Rental
    </Button>
  );
};

export default PayRentalButton;
