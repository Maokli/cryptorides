import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../shared/entities/user.entity';

@ObjectType()
@Entity('CarsTable')
export class Car {

  @Field(() => Int, { description: 'Unique id of the car' })
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
  @Column({ type: 'float', nullable: false })
  rentalPrice: number;

  @Field(() => Float, { nullable: false })
  @Column({ type: 'float', nullable: false })
  downPayment: number;

  @Field(() => [User], {description: 'Car Owner'})
  @ManyToOne(() => User, (user) => user.carsCreatedByUser)
  owner: User

}
