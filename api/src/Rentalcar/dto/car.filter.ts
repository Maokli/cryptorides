import { InputType, Field, Float } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class CarFilter {
  @Field(() => Date, { nullable: true })
  availabilityFrom: Date;

  @Field(() => Date, { nullable: true })
  availabilityTo: Date;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  minPrice: number;

  @Field(() => Float, { nullable: true })
  maxPrice: number;

  @Field(() => Float, { nullable: true })
  minDownPayment: number;

  @Field(() => Float, { nullable: true })
  maxDownPayment: number;

  @Field(() => String, { nullable: true })
  search: string;

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => String, { nullable: true })
  color: string;

  @Field(() => String, { nullable: true })
  brand: string;
}
