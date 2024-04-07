import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from './car.entity';
import { Field,ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity('UsersTable')
export class User {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50, nullable: false })
  name: string;

  @Field()
  @Column({ length: 50, nullable: false })
  familyName: string;

  @Field()
  @Column({ length: 255, nullable: false })
  email: string;

  @Field()
  @Column({ length: 50, nullable: true })
  phoneNumber: string;

  @Field(() => [Car]) 
  @OneToMany(() => Car, (car) => car.owner)
  carsCreatedByUser: Car[]

  /**
   * The hash of the password.
   * To identify a correct login we should compare hashes not raw passwords.
   */
  @Field()
  @Column({ nullable: false })
  passwordHash: string;

  /**
   * A random string of a constant length.
   * Before hashing the password we concat it with this salt and hash the result.
   * This is a mechanism to avoid hash collisions.
   */
  @Field()
  @Column({ nullable: false })
  passwordSalt: string;
}
