import { CreateCarInput } from "./create-car.input";
import { InputType, Field, Int, PartialType, Float } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  IsEnum,
} from "class-validator";
import { fuelType } from "../enum/fuelType.enum";

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field(() => Int)
  @IsInt()
  id: number;
  @Field({ nullable: false })
  @IsOptional()
  @IsString()
  location: string;

  @Field({ nullable: false })
  @IsOptional()
  @IsString()
  brand: string;

  @Field({ nullable: false })
  @IsOptional()
  @IsString()
  color: string;

  @Field({ nullable: false })
  @IsOptional()
  @IsString()
  title: string;

  @Field(() => Float, { nullable: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  rentalPrice: number;

  @Field(() => Float, { nullable: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  downPayment: number;

  @Field(() => Int)
  @IsOptional()
  @Min(1)
  seatsNumber: number = 4;

  @Field(() => fuelType, {
    description: "Fuel type enum : Gas, Diesel, Electric ...",
  })
  @IsOptional()
  @IsEnum(fuelType)
  fuelType: fuelType = fuelType.Gas;

}
