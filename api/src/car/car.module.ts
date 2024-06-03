import { Module, forwardRef } from "@nestjs/common";
import { CarService } from "./car.service";
import { CarResolver } from "./car.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { UsersModule } from "../users/users.module";
import { Rentalcar } from "src/Rentalcar/entities/rentalcar.entity";
import { FileAssignment } from "src/file-assignment/entities/file-assignment.entity";

@Module({
  providers: [CarResolver, CarService],
  imports: [TypeOrmModule.forFeature([Car, Rentalcar, FileAssignment]), forwardRef(() => UsersModule)],
  exports: [CarService],
})
export class CarModule {}
