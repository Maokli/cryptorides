import { Module } from "@nestjs/common";
import { RentalCarService } from "./rentalcar.service";
import { RentalcarResolver } from "./rentalcar.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rentalcar } from "./entities/rentalcar.entity";
import { Car } from "../car/entities/car.entity";
import { CarModule } from "../car/car.module";
import { rentalRequest } from "./entities/rentalRequest.entity";
import { NotificationModule } from "src/notification/notification.module";


@Module({
  imports: [TypeOrmModule.forFeature([Rentalcar, Car, rentalRequest]), CarModule,NotificationModule],
  providers: [RentalcarResolver, RentalCarService],
})
export class RentalcarModule {}

