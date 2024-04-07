/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from '../../car/entities/car.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('UsersTable')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ length: 50, nullable: false })
  name: string;

  @Field({ nullable: false })
  @Column({ length: 50, nullable: false})
  familyName: string;

  @Field({ nullable: false })
  @Column({ length: 255, nullable: false })
  email: string;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  phoneNumber: string;

  @Field(() => [Car], { nullable: true })
  @OneToMany(() => Car, (car) => car.owner)
  carsCreatedByUser: Car[];

  /**
   * The hash of the password.
   * To identify a correct login we should compare hashes not raw passwords.
   */
  @Field({ nullable: false })
  @Column({ nullable: false })
  passwordHash: string;

  /**
   * A random string of a constant length.
   * Before hashing the password we concat it with this salt and hash the result.
   * This is a mechanism to avoid hash collisions.
   */
  @Field({ nullable: false })
  @Column({ nullable: false })
  passwordSalt: string;
}