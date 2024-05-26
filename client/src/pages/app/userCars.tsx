import React from 'react';
import CarGrid from '../../components/car-grid.component';
import { Car } from '../../models/car.model';
import { gql, useMutation, useQuery } from '@apollo/client';
import { getUserToken } from '../../helpers/auth.helpers';

const GetUserCars = gql`
  query GetUserCars {
    userCars {
        id , 
        location , 
        brand , 
        color , 
        title , 
        fuelType , 
        rentalPrice , 
        downPayment
    }
  }
`;
const images = [
    {
      url:
        'https://www.turbo.fr/sites/default/files/migration/test/field_image/000000005301416.jpg',
    },
    {
      url:
        'https://fdm.dk/sites/default/files/d6images/07-bpv-toyotagt86-002.jpg',
    },
    {
      url:
        'https://www.topspeed.sk/userfiles/articles/10-12/11605/1481385478-toyota.gt86.jpg',
    },
    {
      url:
        'https://editorial.pxcrush.net/carsales/general/editorial/161214_toyota_86_gt_ii_01-j01q.jpg?width=1024&height=682',
    },
  ];

function BrowseUserCars() {
    const token = getUserToken();
    const { loading, error, data } = useQuery(GetUserCars, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    let userCars: Car[] = data.userCars;

    const uc = (userCars: any[]) => {
        return userCars.map((car: any) => ({
            ...car,
            seats: 0 , 
            images : images       
        }));
       }
    return (
        <CarGrid cars={uc(userCars)}></CarGrid>
    );
}

export default BrowseUserCars;
