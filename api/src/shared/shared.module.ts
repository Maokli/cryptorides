import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Car } from './entities/car.entity';
import { FileAssignment } from './entities/fileAssignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, FileAssignment])],
})
export class SharedModule {}
