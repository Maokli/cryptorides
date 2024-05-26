
import { InputType } from '@nestjs/graphql';
import { Car } from 'src/car/entities/car.entity';

@InputType()
export class CreateNotificationInput {

  car : Car;

}
