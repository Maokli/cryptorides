/* eslint-disable prettier/prettier */
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
