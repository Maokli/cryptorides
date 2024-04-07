import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CarFilter {
  @Field({ nullable: true })
  availabilityFrom: Date;

  @Field({ nullable: true })
  availabilityTo: Date;

  @Field(() => Float, { nullable: true })
  minPrice: number;

  @Field(() => Float, { nullable: true })
  maxPrice: number;

  @Field(() => Float, { nullable: true })
  minDownPayment: number;

  @Field(() => Float, { nullable: true })
  maxDownPayment: number;
}
