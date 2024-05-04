import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../car/entities/car.entity";
import { IsNotEmpty } from "class-validator";
import { statusRequest } from "../enum/statusRequest.enum";

@ObjectType()
@Entity("CarRentalRequestTable")
export class rentalRequest {

    @Field(() => Int)
    @Column({ nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Date)
    @Column({ type: "datetime", nullable: false })
    fromdate: Date;

    @Field(() => Date)
    @Column({ type: "datetime", nullable: false })
    todate: Date;
 
    @Field(() => statusRequest)
    @Column({ nullable: false, enum: statusRequest, default: statusRequest.Waiting })
    @IsNotEmpty()
    status: statusRequest = statusRequest.Waiting;

    // pour le moment j'ai mis owner id as a number mais je veux savoir si je mets Owner as an object
    @Field(()=>Number)
    @Column( {nullable: false})

    ownerId:Number;
    
    @Field(()=>Number)
    @Column( {nullable: false})
    renterId:Number;


    @Field(() => String)
    @CreateDateColumn({ type: "text" }) 
    createdAt: Date;

    @Field(() => Car)
    @ManyToOne((car) => Car, (car) => car.rentalrequests)
    car: Car;
}
