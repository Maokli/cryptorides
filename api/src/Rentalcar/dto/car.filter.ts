import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CarFilter {
  @Field({ nullable: true })
  availabilityFrom: Date;

  @Field({ nullable: true })
  availabilityTo: Date;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  minPrice: number = 50.0;

  @Field(() => Float, { nullable: true })
  maxPrice: number = 5000.0;

  @Field(() => Float, { nullable: true })
  minDownPayment: number;

  @Field(() => Float, { nullable: true })
  maxDownPayment: number;
}
