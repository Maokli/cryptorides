import React from 'react';
import { Box, Button } from '@mui/material';
import { getUserIdFromToken } from '../services/account.service';
import PayButton from './pay-rental-button';
import CarCard from './car-card.component';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RequestStatusStepper from './request-status-stepper';

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
            seatsNumber: number;
            images: any;
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
                <RequestStatusStepper currentStatus={rentalRequest.status} />
            </Box>
            {isOwner ? (
                <Box mb={2}>
                    <Button
                        variant="contained"
                        onClick={handleApprove}
                        sx={{ mr: '2%', bgcolor: '#00DB1E' }}
                        startIcon={<CheckCircleIcon sx={{ mr: '1%' }} />}
                    >
                        Approve Request
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDeny}
                        sx={{ bgcolor: '#F31C1D' }}
                        startIcon={<DoDisturbOnIcon sx={{ mr: '1%' }} />}
                    >
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
