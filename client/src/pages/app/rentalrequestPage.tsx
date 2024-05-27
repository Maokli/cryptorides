import React, { useEffect, useState } from 'react';
import { getIdFromToken, getUserToken } from '../../helpers/auth.helpers';
import { Box, Divider, Typography, Paper } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import debouncedFilters from './browse-cars.page';
import RentalRequestsList from '../../components/rentalRequest-list';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';

const query = `
  query getAllRentalsRequests($input: getRentalRequestInput!) {
    getAllRentalsRequests(getRentalRequestInput: $input) {
        id , 
        fromdate , 
        todate ,  
        car {
            id , 
            brand 
        }
    }
  }
`;

function BrowseUserRentalRequests() {
    const [renterrequests, setrenterrequest] = useState([]);
    const [ownerrequests, setownerrequest] = useState([]);
    
    const fetchdataAsowner = async () => {
        const token = getUserToken();
        const userId = getIdFromToken(token as string);
        let variables = {
            input: {
                userId: userId,
                userRole: "owner"
            }
        };

        try {
            const response = await axios.instance.post(
                "http://localhost:3001/graphql",
                {
                    query,
                    variables
                },
                {
                    headers: {
                        Authorization: `Bearer ${getUserToken()}`,
                    },
                }
            );
            setownerrequest(response.data.data.getAllRentalsRequests);
        } catch {
            console.log("error");
        }
    };
    
    const fetchdataAsRenter = async () => {
        const token = getUserToken();
        const userId = getIdFromToken(token as string);
        let variables = {
            input: {
                userId: userId,
                userRole: "renter"
            }
        };

        try {
            const response = await axios.instance.post(
                "http://localhost:3001/graphql",
                {
                    query,
                    variables
                },
                {
                    headers: {
                        Authorization: `Bearer ${getUserToken()}`,
                    },
                }
            );
            setrenterrequest(response.data.data.getAllRentalsRequests);
        } catch {
            console.log("error");
        }
    };
    
    useEffect(() => {
        fetchdataAsowner();
        fetchdataAsRenter();
    }, [debouncedFilters]);

    return (
        <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'space-around', alignItems: 'center', p: 3 }}>
            <Paper elevation={3} sx={{ width: '45vw', p: 3, borderRadius: 2, boxShadow: 3, height : '90vh' }}>
                <Typography variant="h6" color="green" align="center" fontWeight="bold">
                Incoming Requests <CallReceivedIcon></CallReceivedIcon>
                </Typography>
                <Divider flexItem sx={{ my: 2 }} />
                <RentalRequestsList rentalrequest={ownerrequests} />
            </Paper>
            <Paper elevation={3} sx={{ width: '45vw', p: 3, borderRadius: 2, boxShadow: 3, height : '90vh' }}>
                <Typography variant="h6" color="red" align="center" fontWeight="bold">
                Outgoing Requests <CallMadeIcon></CallMadeIcon>
                </Typography>
                <Divider flexItem sx={{ my: 2 }} />
                <RentalRequestsList rentalrequest={renterrequests} />
            </Paper>
        </Box>
    );
}

export default BrowseUserRentalRequests;
