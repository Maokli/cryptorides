import { Image } from "./image.model";

export interface Car {
  id: number;

  ownerId: number;

  location: string;

  brand: string;

  color: string;

  title: string;

  fuelType: string;

  seatsNumber: number;

  rentalPrice: number;

  downPayment: number;

  images: Image[]
}