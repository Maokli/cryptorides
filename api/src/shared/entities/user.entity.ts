import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Car } from "../../car/entities/car.entity";
import { Notification } from "../../notification/entities/notification.entity";

@ObjectType()
@Entity("UsersTable")
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50, nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  FamilyName: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true })
  email: string;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  phoneNumber: string;

  @Field(() => [Car], { nullable: true })
  @OneToMany(() => Car, (car) => car.owner)
  carsCreatedByUser: Car[];


  @Field(() => [Notification], { nullable: true })
  @OneToMany(() => Notification, (notification) => notification.owner)
  notifByUser: Notification[];

  /**
   * A random string of a constant length.
   * Before hashing the password we concat it with this salt and hash the result.
   * This is a mechanism to avoid hash collisions.
   *!!! Storing only the password hash in the database
   */
  @Field()
  @Column({ nullable: false })
  passwordHash: string;
}
