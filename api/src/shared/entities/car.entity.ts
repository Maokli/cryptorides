import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Rentalcar } from '../../Rentalcar/entities/rentalcar.entity';

@ObjectType()
@Entity('CarsTable')
export class Car {

  @Field()
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
  @Column({ type: 'float', nullable: false })
  rentalPrice: number;

  @Field()
  @Column({ type: 'float', nullable: false })
  downPayment: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.carsCreatedByUser)
  owner: User
  
  @Field(()=>Rentalcar)
  @OneToMany(()=>Rentalcar,(rentalcar)=>rentalcar.car)
  rentalscars: Rentalcar[];
  
}
