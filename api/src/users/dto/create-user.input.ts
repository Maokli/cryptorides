/* eslint-disable prettier/prettier */
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsString()
  FamilyName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsPhoneNumber()
  phoneNumber: string;
}
