/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AddMessageDto {
  @Field(() => ID)
  author: string;

  @Field()
  content: string;

  @Field()
  createdAt: Date;
}
