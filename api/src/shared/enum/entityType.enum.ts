import { registerEnumType } from '@nestjs/graphql';

export enum entityType {
  Car = 1,
  User = 1 << 1
}

registerEnumType(entityType, { name: 'EntityType' });
