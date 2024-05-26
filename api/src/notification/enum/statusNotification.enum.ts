import { registerEnumType } from '@nestjs/graphql';

export enum statusNotification {
    NEW = "New",
    SEEN = "Seen",
  }

  registerEnumType(statusNotification, { name: 'statusNotification', });


