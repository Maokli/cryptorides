import { Car } from "./car.model";
import { statusRequest } from "./request-status.enum";

export interface rentalRequestDto {
  id: number;

  fromdate: Date;

  todate: Date;

  status: statusRequest;

  ownerId:Number;
  
  renterId:Number;

  createdAt: Date;

  car: Car;
}