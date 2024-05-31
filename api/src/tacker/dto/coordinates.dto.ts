/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class CoordinatesDto {
  @Field(() => ID)
  id: number;
  @Field()
  carID: Number;
  @Field()
  latitude: Number;
  @Field()
  longitude: Number;
  @Field()
  createdAt: Date;
}
