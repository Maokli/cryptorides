import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../shared/entities/user.entity";
import { Car } from "src/car/entities/car.entity";
import { CarModule } from "src/car/car.module";
import { FileAssignment } from "src/file-assignment/entities/file-assignment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, FileAssignment]), forwardRef(() => CarModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}