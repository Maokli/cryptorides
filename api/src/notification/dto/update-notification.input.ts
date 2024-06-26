import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput{
  @Field(() => [Int])
  ids: number[];
}
