import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { FileUpload } from 'graphql-upload';
import { entityType } from '../../shared/enum/entityType.enum';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateFileAssignmentInput {
  @Field(() => GraphQLUpload, { nullable: false })
  file: Promise<FileUpload>;

  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  elementId: number;

  @Field(() => entityType)
  elementType: entityType;
}