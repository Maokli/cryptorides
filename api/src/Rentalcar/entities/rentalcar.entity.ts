import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../../car/entities/car.entity';

@ObjectType()
@Entity("CarRentalTable")
export class Rentalcar  {
  
   @Field(()=>Int)
   @PrimaryGeneratedColumn()
   id: number;

   @Field(()=>Date)
   @Column()
   reservedfrom : Date;

   @Field(()=>Date)
   @Column()
   reservedto :Date;


  @Field(()=>Car)
  @ManyToOne((car)=>Car,(car) =>car.rentalscars)
  car : Car;



   



}
