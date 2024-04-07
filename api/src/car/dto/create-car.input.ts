import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min } from 'class-validator';

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

  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  ownerId: number;
}

