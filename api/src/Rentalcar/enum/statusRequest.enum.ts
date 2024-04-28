import { registerEnumType } from '@nestjs/graphql';

export enum statusRequest {
  Waiting = "Waiting",
  Approved = "Approved",
  Paid = "Paid",
}

registerEnumType(statusRequest, { name: 'StatusRequest', });



