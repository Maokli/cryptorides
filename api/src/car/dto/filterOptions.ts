import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class FilterOptions {
  @Field(() => [String])
  locations: string[];

  @Field(() => [String])
  colors: string[];

  @Field(() => [String])
  brands: string[];

  @Field(() => Number)
  maxDownPayment: number;

  @Field(() => Number)
  maxDailyRentalPrice: number;
}
