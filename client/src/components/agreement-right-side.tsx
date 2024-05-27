import React from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { getUserIdFromToken } from '../services/account.service';
import PayButton from './pay-rental-button';

const statusColors = {
    Waiting: 'yellow',
    Approved: 'blue',
    Paid: 'green',
    Cancelled: 'red'
};

interface AgreementRightSideProps {
    rentalRequest: {
        id: number;
        status: 'Waiting' | 'Approved' | 'Paid' | 'Cancelled';
        fromdate: string;
        todate: string;
        ownerId: number;
        renterId: number;
        car: {
            id: number;
            make: string;
            model: string;
            year: number;
            rentalPrice: number;
            downPayment: number;
        };
    };
    onStatusUpdate: (newStatus: 'Approved' | 'Denied') => void;
}

const AgreementRightSide: React.FC<AgreementRightSideProps> = ({ rentalRequest, onStatusUpdate }) => {
    const userId = getUserIdFromToken();
    const isOwner = userId !== null && userId !== undefined && Number(userId) === rentalRequest.ownerId;

    const handleApprove = () => {
        onStatusUpdate('Approved');
    };

    const handleDeny = () => {
        onStatusUpdate('Denied');
    };

    return (
        <Box padding={2}>
            <Box display="flex" alignItems="center" mb={2}>
                <Box
                    width={10}
                    height={10}
                    borderRadius="50%"
                    bgcolor={statusColors[rentalRequest.status]}
                    mr={1}
                />
                <Typography variant="h6">{rentalRequest.status}</Typography>
            </Box>
            {isOwner ? (
                <Box mb={2}>
                    <Button variant="contained" color="primary" onClick={handleApprove} style={{ marginRight: '8px' }}>
                        Approve Request
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDeny}>
                        Deny Request
                    </Button>
                </Box>
            ) : (
                <PayButton requestId={rentalRequest.id} onSuccess={() => { }} onError={() => { }} />
            )}
            <Card>
                <CardContent>
                    <Typography variant="h6">Car Details</Typography>
                    <Typography>Make: {rentalRequest.car.make}</Typography>
                    <Typography>Model: {rentalRequest.car.model}</Typography>
                    <Typography>Year: {rentalRequest.car.year}</Typography>
                    <Typography>Rental Price: {rentalRequest.car.rentalPrice} TND</Typography>
                    <Typography>Down Payment: {rentalRequest.car.downPayment} TND</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AgreementRightSide;
