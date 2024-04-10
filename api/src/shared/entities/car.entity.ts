/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { User } from "./user.entity";

@ObjectType()
@Entity("CarsTahle")
export class Car {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255, nullable: false })
  location: string;

  @Field()
  @Column({ length: 255, nullable: false })
  brand: string;

  @Field()
  @Column({ length: 255, nullable: false })
  color: string;

  @Field()
  @Column({ length: 255, nullable: false })
  title: string;

  @Field()
  @Column({ type: "float", nullable: false })
  rentalPrice: number;

  @Field()
  @Column({ type: "float", nullable: false })
  downPayment: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.carsCreatedByUser)
  owner: User;
}
