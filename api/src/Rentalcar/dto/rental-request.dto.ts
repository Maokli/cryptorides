import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../car/entities/car.entity";
import { IsNotEmpty } from "class-validator";
import { statusRequest } from "../enum/statusRequest.enum";
import { CarWithImages } from "src/shared/dto/get-car-withImage-dto";

@ObjectType()
export class rentalRequestDto {
    @Field(() => Int)
    id: number;

    @Field({ nullable: false })
    fromdate: Date;

    @Field({ nullable: false })
    todate: Date;
 
    @Field({ nullable: false })
    status: statusRequest = statusRequest.Waiting;

    @Field({ nullable: false })
    ownerId:Number;
    
    @Field({ nullable: false })
    renterId:Number;

    @Field({ nullable: false })
    createdAt: Date;

    @Field({ nullable: false })
    car: CarWithImages;
}
