
import { InputType } from '@nestjs/graphql';
import { rentalRequest } from 'src/Rentalcar/entities/rentalRequest.entity';
import { User } from 'src/shared/entities/user.entity';

@InputType()
export class CreateNotificationInput {

  owner : User;

  message: string;

  rentalRequest: rentalRequest;
}
