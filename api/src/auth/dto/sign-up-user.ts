/* eslint-disable prettier/prettier */
import { InputType, Field } from "@nestjs/graphql";
import {
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

@InputType()
export class SignUpUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20, { message: "Password cannot be longer than 20 characters" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsPhoneNumber()
  phoneNumber: string;

  @Field()
  @IsString()
  @IsString()
  familyName: string;

  @Field()
  @IsString()
  @IsString()
  confirmPassword: string;
}
