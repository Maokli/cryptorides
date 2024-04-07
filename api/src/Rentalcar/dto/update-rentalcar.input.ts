import { CreateRentalcarInput } from './create-rentalcar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRentalcarInput extends PartialType(CreateRentalcarInput) {
  @Field(() => Int)
  id: number;
}
