import React, { useEffect } from 'react';
import axios from 'axios';
import { useRequest } from '../../helpers/request-hook.helper';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Car } from '../../models/car.model';

const LoadingSpinnerTestPage: React.FC = () => {
    const [isLoading, data] = useRequest<Car>(() => getCarById(1));

    useEffect(() => {
        console.log('Data:', data);
    }, [data]);

    return (
        <div>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <div>
                    {data ? (
                        <div>
                            <h2>{data.title}</h2>
                            <p>Color: {data.color}</p>
                            <p>Brand: {data.brand}</p>
                            <p>Fuel Type: {data.fuelType}</p>
                            <p>Location: {data.location}</p>
                            <p>Down Payment: {data.downPayment}</p>
                            <p>Rental Price: {data.rentalPrice}</p>
                            <p>Number of seats: {data.seatsNumber}</p>
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            )}
        </div>
    );
};

const getCarById = async (id: number): Promise<Car | undefined> => {
    try {
        const query = `
      query GetCarById($id: Int!) {
        car(id: $id) {
            id
            brand
            color
            location
            title
            rentalPrice
            downPayment
            seatsNumber
            fuelType
            owner {
              id
              name
            }
        }
      }
    `;

        const variables = {
            id: id
        };

        const response = await axios.post('http://localhost:3000/graphql', {
            query,
            variables
        }, {
            headers: {
                'Content-Type': 'application/json',
                // change to a valid auth token when testing that page
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZWRpYS5iZW4uYWxpQGluc2F0LnVjYXIudG4iLCJzdWIiOjEsImlhdCI6MTcxNDMyODc1OCwiZXhwIjoxNzE0NDE1MTU4fQ.yqydvYOPvKOfBKPVVbwPQRCZfSbsSBoCiivJ1k_-sl4'
            }
        });

        const responseData = response.data;

        if (responseData.errors) {
            throw new Error(responseData.errors[0]?.message || 'Failed to fetch data');
        }

        return responseData.data.car as Car;
    } catch (error) {
        console.error('Error fetching data:', error);
        return undefined;
    }
};

export default LoadingSpinnerTestPage;