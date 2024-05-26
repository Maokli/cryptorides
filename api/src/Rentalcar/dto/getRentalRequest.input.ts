import { InputType, Int, Field } from "@nestjs/graphql";
import {  IsNotEmpty } from "class-validator";



@InputType()
export class getRentalRequestInput {


    @Field(() => Int)
    @IsNotEmpty()
    userId: number;
     
    @Field(() => String)
    userRole: 'owner' | 'renter'; 




    
  




}