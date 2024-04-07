import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../../shared/entities/car.entity';

@ObjectType()
@Entity("CarRentalTable")
export class Rentalcar  {
  
   @Field()
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column()
   reservedfrom : Date;

   @Field()
   @Column()
   reservedto :Date;


  @Field(()=>Car)
  @ManyToOne((car)=>Car,(car) =>car.rentalscars)
  car : Car;



   



}
