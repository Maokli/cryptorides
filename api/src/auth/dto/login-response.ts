/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/shared/entities/user.entity";
@ObjectType()
export class LoginResponse {
  @Field()
  user: User;
  @Field()
  access_token: string;
}
