import { registerEnumType } from '@nestjs/graphql';

export enum statusRequest {
  Waiting = "Waiting",
  Approved = "Approved",
  Paid = "Paid",
  Cancelled='Cancelled'
}

registerEnumType(statusRequest, { name: 'StatusRequest', });



