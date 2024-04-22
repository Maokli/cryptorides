import { InputType, Field, Int } from '@nestjs/graphql';
import { entityType } from '../../shared/enum/entityType.enum';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateFileAssignmentInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  fileUrl: string;

  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  elementId: number;

  @Field(() => entityType)
  elementType: entityType;
}