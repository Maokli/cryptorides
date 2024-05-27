/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AddMessageDto {
  @Field(() => ID)
  author: string;

  @Field()
  body: string;
  @Field()
  recipientId: string;
  @Field()
  createdAt: Date;
}
