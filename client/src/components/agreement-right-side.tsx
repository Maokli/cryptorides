import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { getUserIdFromToken } from '../services/account.service';
import PayButton from './pay-rental-button';
import CarCard from './car-card.component';

const statusColors = {
    Waiting: 'orange',
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
            brand: string;
            location: string;
            fuelType: string;
            rentalPrice: number;
            downPayment: number;
            ownerId: number;
            color: string;
            seatsNumber : number;
            images : any;
            title: string;
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
                    width={15}
                    height={15}
                    borderRadius="50%"
                    bgcolor={statusColors[rentalRequest.status]}
                    mr={1}
                />
                <Typography variant="h6">{rentalRequest.status}</Typography>
            </Box>
            {isOwner ? (
                <Box mb={2}>
                    <Button variant="contained" onClick={handleApprove} style={{ marginRight: '8px', backgroundColor: '#00DB1E' }}>
                        Approve Request
                    </Button>
                    <Button variant="contained" onClick={handleDeny} style={{ marginRight: '8px', backgroundColor: '#F31C1D' }}>
                        Deny Request
                    </Button>
                </Box>
            ) : (
                <PayButton requestId={rentalRequest.id} onSuccess={() => { }} onError={() => { }} />
            )}
            <CarCard car={rentalRequest.car}></CarCard>
        </Box>
    );
};

export default AgreementRightSide;
