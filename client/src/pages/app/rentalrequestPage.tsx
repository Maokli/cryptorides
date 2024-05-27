import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { getLoggedInUserId, getUserToken } from '../../helpers/auth.helpers';
import { Box, Divider, Typography } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import debouncedFilters from './browse-cars.page'
import RentalRequestsList from '../../components/rentalRequest-list';
import { RentalRequest } from '../../models/renatalrequest.model';
import { green } from '@mui/material/colors';
const query = `
  query getAllRentalsRequests($input: getRentalRequestInput!) {
    getAllRentalsRequests(getAllRequest: $input) {
        id
    }
  }
`;
// mock data for renterrequests and ownerrequests
const x: RentalRequest[] = [
    {
        ownerId: 2,
        id: 0,
        fromdate: new Date(),
        todate: new Date(),
        renterId: 1,
        createdAt: new Date(),
        car: {
            images: [{ url: "https://images.unsplash.com/photo-1564135624576-c5c88640f235" }],
            id: 0,
            ownerId: 0,
            location: '',
            brand: '',
            color: '',
            title: '',
            fuelType: '',
            seatsNumber: 0,
            rentalPrice: 0,
            downPayment: 0
        }
    }

]
function BrowseUserRentalRequests() {
    const [renterrequests, setrenterrequest] = useState([]);
    const [ownerrequests, setownerrequest] = useState([]);
    const fetchdataAsowner = async () => {
        const userId = getLoggedInUserId();
        const token = getUserToken();
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
        const userId = getLoggedInUserId();
        const token = getUserToken();
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
        fetchdataAsRenter();
    }, [debouncedFilters]);
    useEffect(() => {
        fetchdataAsRenter();
    }, [debouncedFilters]);
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
