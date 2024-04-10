import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, IsEnum } from 'class-validator';
import { fuelType } from '../enum/fuelType.enum';

@InputType()
export class CreateCarInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  location: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  color: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => Float, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  rentalPrice: number;

  @Field(() => Float, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  downPayment: number;

  @Field(() => Int)
  @IsOptional()
  @Min(1)
  seatsNumber: number = 4;

  @Field(() => fuelType, {description: 'Fuel type enum : Gas, Diesel, Electric ...'})
  @IsOptional()
  @IsEnum(fuelType)
  fuelType: fuelType = fuelType.Gas;

  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  ownerId: number;
}