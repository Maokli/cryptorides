import { Module } from '@nestjs/common';
import { RentalCarService } from './rentalcar.service';
import { RentalcarResolver } from './rentalcar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rentalcar } from './entities/rentalcar.entity';
import { Car } from '../shared/entities/car.entity';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([Rentalcar,Car]),
    ],
  providers: [RentalcarResolver, RentalCarService],
})
export class RentalcarModule {}
