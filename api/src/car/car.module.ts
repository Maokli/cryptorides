import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

@Module({
  providers: [CarResolver, CarService],
  imports: [TypeOrmModule.forFeature([Car])],
})
export class CarModule {}