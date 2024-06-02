import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/shared/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { statusNotification } from '../enum/statusNotification.enum';
import { Rentalcar } from 'src/Rentalcar/entities/rentalcar.entity';
import { rentalRequest } from 'src/Rentalcar/entities/rentalRequest.entity';

@ObjectType()
@Entity('NotificationTable')
export class Notification {
  
  @Field(() => Int)
  @Column({ nullable: false })
  @PrimaryGeneratedColumn()
  id: Number;
  
  @Field(() => User, { description: "Car Owner", nullable: false })
  @ManyToOne(() => User, (user) => user.notifByUser) 
  owner: User;

  @Field(() => User, { description: "Concerned rental request", nullable: false })
  @ManyToOne(() => rentalRequest, (rentalRequest) => rentalRequest.notifications) 
  rentalRequest: rentalRequest;
 
  @Field(()=> String)
  @Column({nullable:false})
  @IsNotEmpty()
  message:String;
  
  @Field(() => statusNotification)
  @Column({
    nullable:false,
    enum: statusNotification,
    default: statusNotification.NEW,
  })
  status: statusNotification;
}



