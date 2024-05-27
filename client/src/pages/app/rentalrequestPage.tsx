import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { getIdFromToken, getUserToken } from '../../helpers/auth.helpers';
import { Box, Divider, Typography } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import debouncedFilters from './browse-cars.page'
import RentalRequestsList from '../../components/rentalRequest-list';
import { RentalRequest } from '../../models/renatalrequest.model';
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
        }

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
            console.log(response.data.data.getAllRentalsRequests);
            setownerrequest(response.data.data.getAllRentalsRequests);
        }
        catch {
            console.log("error")
        }

    }
    const fetchdataAsRenter = async () => {
        const token = getUserToken();
        const userId = getIdFromToken(token as string);
        let variables = {
            input: {
                userId: userId,
                userRole: "owner"
            }
        }

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
        }
        catch {
            console.log("error")
        }

    }
    useEffect(() => {
        fetchdataAsowner();
    }, [debouncedFilters]);
    useEffect(() => {
        fetchdataAsRenter();
    }, [debouncedFilters]);
    console.log(renterrequests, ownerrequests) ; 
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
            <Typography variant="h6" color="green" align="center">
               Incoming Requests : 
            </Typography>                <Divider flexItem />
                <RentalRequestsList rentalrequest={ownerrequests} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
            <Typography variant="h6" color="red" align="center">
               Outgoing Requests : 
            </Typography> 
            <RentalRequestsList rentalrequest={renterrequests} />
            </Box>
        </Box>
    );
}

export default BrowseUserRentalRequests;
