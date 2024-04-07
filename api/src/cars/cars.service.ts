import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../shared/entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async createCar(carData: any, picture: any): Promise<Car> {
    const car = new Car();
    car.title = carData.title;
    car.location = carData.carLocation;
    car.rentalPrice = carData.rentalPrice;
    car.downPayment = carData.downPayment;
    car.brand = carData.brand;
    car.color = carData.color;

    return this.carRepository.save(car);
  }
}
