import { InputType, Field } from '@nestjs/graphql';
import { statusRequest } from "../enum/statusRequest.enum";

@InputType()
export class UpdateRentalRequestInput {
  @Field(() => statusRequest)
  newStatus: statusRequest;
  
}
