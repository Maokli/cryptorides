import React, { useEffect } from 'react';
import axios from 'axios';
import { useRequest } from '../../helpers/request-hook.helper';
import { BallTriangle } from 'react-loader-spinner';
import { Car } from '../../models/car.model';

const LoadingSpinnerTestPage: React.FC = () => {
    const [isLoading, data] = useRequest<Car>(() => getCarById(1));

    useEffect(() => {
        console.log('Data:', data);
    }, [data]);

    return (
        <div>
            {isLoading ? (
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#3563e9"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}
                    wrapperClass=""
                    visible={true}
                />
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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZWRpYS5iZW4uYWxpQGluc2F0LnVjYXIudG4iLCJzdWIiOjEsImlhdCI6MTcxNDI5Nzg2NywiZXhwIjoxNzE0Mzg0MjY3fQ.sScIqv2NWhVBlK3IBPuJzTcSrFzY0uI-e9Vbf9T-xGo'
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
