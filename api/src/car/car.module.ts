import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Upload } from '../shared/scalars/upload.scalar';

@Module({
  providers: [CarResolver, CarService, Upload],
  imports: [TypeOrmModule.forFeature([Car])],
})
export class CarModule {}
