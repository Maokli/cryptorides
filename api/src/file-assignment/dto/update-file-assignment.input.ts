import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateFileAssignmentInput } from './create-file-assignment.input';

@InputType()
export class UpdateFileAssignmentInput extends PartialType(CreateFileAssignmentInput) {
  @Field(() => Int)
  id: number;
}
