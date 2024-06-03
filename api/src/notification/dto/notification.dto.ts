import { Field, ObjectType } from "@nestjs/graphql";
import { statusNotification } from "../enum/statusNotification.enum";


@ObjectType()
export class NotificationDto {
  @Field({ nullable: false })
  id: Number;
 
  @Field({ nullable: false })
  message:String;
  
  @Field({ nullable: false })
  status: statusNotification;
  
  @Field({ nullable: false })
  rentalRequestId: number;
}



