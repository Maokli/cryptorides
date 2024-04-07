import { IsInt } from 'class-validator';
import { CreateCarInput } from './create-car.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field(() => Int)
  @IsInt()
  id: number;
}
