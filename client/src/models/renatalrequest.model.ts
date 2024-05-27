import { Car } from "./car.model";

export interface RentalRequest {
    id: number;
    fromdate: Date;
    todate: Date;
    ownerId:Number;
    renterId:Number;
    createdAt: Date;
    car: Car;
}