import { InputType, Int, Field } from "@nestjs/graphql";
import { IsDate, IsNotEmpty } from "class-validator";

@InputType()
export class rentalRequestInput {

    @Field(() => Int)
    @IsNotEmpty()
    carId: number;

    @Field(() => Date)
    @IsDate()
    availabilityFrom: Date;

    @Field(() => Date)
    @IsDate()
    availabilityTo: Date;

    @Field(() => Int)
    @IsNotEmpty()
    ownerId: number;

    @Field(() => Int)
    @IsNotEmpty()
    renterId: number;



    
  




}
