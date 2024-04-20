import React from 'react';
import CarGrid from '../../components/car-grid.component';
import { Car } from '../../models/car.model';

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
const cars: Car[] = [
  {
    id: 1,
    location: "New York",
    brand: "Toyota",
    color: "Blue",
    title: "Toyota Corolla",
    fuelType: "Petrol",
    seats: 5,
    rentalPrice: 50,
    downPayment: 1000,
    images: images
  },
  {
    id: 2,
    location: "Los Angeles",
    brand: "Honda",
    color: "Red",
    title: "Honda Civic",
    fuelType: "Petrol",
    seats: 5,
    rentalPrice: 60,
    downPayment: 1200,
    images: images
  },
  {
    id: 3,
    location: "Miami",
    brand: "Ford",
    color: "Black",
    title: "Ford Mustang",
    fuelType: "Petrol",
    seats: 4,
    rentalPrice: 80,
    downPayment: 1500,
    images: images
  },
  {
    id: 4,
    location: "Chicago",
    brand: "Chevrolet",
    color: "Silver",
    title: "Chevrolet Camaro",
    fuelType: "Petrol",
    seats: 4,
    rentalPrice: 85,
    downPayment: 1600,
    images: images
  },{
    id: 5,
    location: "New York",
    brand: "Toyota",
    color: "Blue",
    title: "Toyota Corolla",
    fuelType: "Petrol",
    seats: 5,
    rentalPrice: 50,
    downPayment: 1000,
    images: images
  },
  {
    id: 6,
    location: "Los Angeles",
    brand: "Honda",
    color: "Red",
    title: "Honda Civic",
    fuelType: "Petrol",
    seats: 5,
    rentalPrice: 60,
    downPayment: 1200,
    images: images
  },
  {
    id: 7,
    location: "Miami",
    brand: "Ford",
    color: "Black",
    title: "Ford Mustang",
    fuelType: "Petrol",
    seats: 4,
    rentalPrice: 80,
    downPayment: 1500,
    images: images
  },
  {
    id: 8,
    location: "Chicago",
    brand: "Chevrolet",
    color: "Silver",
    title: "Chevrolet Camaro",
    fuelType: "Petrol",
    seats: 4,
    rentalPrice: 85,
    downPayment: 1600,
    images: images
  },
];
function BrowseCarsPage() {
  return (
    <CarGrid cars={cars}></CarGrid>
  );
}

export default BrowseCarsPage;
