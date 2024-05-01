import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { User } from "../../shared/entities/user.entity";
import { fuelType } from "../enum/fuelType.enum";
import { Rentalcar } from "../../Rentalcar/entities/rentalcar.entity";
import { Image } from "./image.model";

@ObjectType()
export class CarWithImages {
  @Field(() => Int, { description: "Unique id of the car" })
  id: number;

  @Field({ nullable: false })
  location: string;

  @Field({ nullable: false })
  brand: string;

  @Field({ nullable: false })
  color: string;

  @Field({ nullable: false })
  title: string;

  @Field(() => Float, { nullable: false })
  rentalPrice: number;

  @Field(() => Float, { nullable: false })
  downPayment: number;

  @Field(() => Int, { nullable: false })
  seatsNumber: number;

  @Field(() => fuelType, {
    description: "Fuel type enum : Gas, Diesel, Electric ...",
    nullable: false,
  })
  fuelType: fuelType;

  @Field(() => [Image], { nullable: true })
  images: Image[];
}
