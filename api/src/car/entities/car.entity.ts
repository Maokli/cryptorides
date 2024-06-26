import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { User } from "../../shared/entities/user.entity";
import { fuelType } from "../enum/fuelType.enum";
import { Rentalcar } from "../../Rentalcar/entities/rentalcar.entity";
import { rentalRequest } from "src/Rentalcar/entities/rentalRequest.entity";

@ObjectType()
@Entity("CarsTable")
export class Car {
  @Field(() => Int, { description: "Unique id of the car" })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ length: 255, nullable: false })
  location: string;

  @Field({ nullable: false })
  @Column({ length: 255, nullable: false })
  brand: string;

  @Field({ nullable: false })
  @Column({ length: 255, nullable: false })
  color: string;

  @Field({ nullable: false })
  @Column({ length: 255, nullable: false })
  title: string;

  @Field(() => Float, { nullable: false })
  @Column({ type: "float", nullable: false })
  rentalPrice: number;

  @Field(() => Float, { nullable: false })
  @Column({ type: "float", nullable: false })
  downPayment: number;

  @Field(() => Int, { nullable: false })
  @Column({ type: "integer", nullable: false })
  seatsNumber: number;

  @Field(() => fuelType, {
    description: "Fuel type enum : Gas, Diesel, Electric ...",
    nullable: false,
  })
  @Column({ nullable: false, enum: fuelType })
  fuelType: fuelType;

  @Field(() => User, { description: "Car Owner", nullable: false })
  @ManyToOne(() => User, (user) => user.carsCreatedByUser)
  owner: User;

  @Field(() => Rentalcar, { nullable: true })
  @OneToMany(() => Rentalcar, (rentalcar) => rentalcar.car)
  rentalscars: Rentalcar[];
  

  @Field(()=>[rentalRequest], {nullable:true})
  @OneToMany(() =>rentalRequest , (rentalrequest) => rentalrequest.car)
  rentalrequests: rentalRequest[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, user => user.carsLikedByUser, { nullable: true })
  likedByUsers: User[];
}
