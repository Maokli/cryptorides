import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Car } from "../car/entities/car.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class SharedModule {}
