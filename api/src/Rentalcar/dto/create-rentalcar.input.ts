import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty} from 'class-validator';


@InputType()
export class CreateRentalcarInput {
  @Field(() => Date)
  @IsDate()
  reservedfrom: Date;

  @Field(() => Date)
  @IsDate()
  reservedto: Date;

  @Field(() => Int)
  @IsNotEmpty()
  carId: number;
}
