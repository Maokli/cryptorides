import { Module } from "@nestjs/common";
import { CarService } from "./car.service";
import { CarResolver } from "./car.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { UsersModule } from "../users/users.module";
import { HelpersModule } from "src/helpers/helpers.module";

@Module({
  providers: [CarResolver, CarService],
  imports: [TypeOrmModule.forFeature([Car]), UsersModule , HelpersModule],
  exports: [CarService],
})
export class CarModule {}
