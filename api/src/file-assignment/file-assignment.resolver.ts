import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { FileAssignmentService } from './file-assignment.service';
import { FileAssignment } from './entities/file-assignment.entity';
import { CreateFileAssignmentInput } from './dto/create-file-assignment.input';
import { UpdateFileAssignmentInput } from './dto/update-file-assignment.input';
import { entityType } from '../shared/enum/entityType.enum';

@Resolver(() => FileAssignment)
export class FileAssignmentResolver {
  constructor(private readonly fileAssignmentService: FileAssignmentService) {}

  @Mutation(() => FileAssignment)
  async createFileAssignment(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('elementId', { type: () => Int }) elementId: number,
    @Args('elementType', { type: () => entityType }) elementType: entityType,
  ): Promise<FileAssignment> {
    const { createReadStream, ...rest } = await file;
    const fileStream = createReadStream();
    return this.fileAssignmentService.create({ file: { ...rest, createReadStream: fileStream }, elementId, elementType });
  }

  @Query(() => [FileAssignment], { name: 'fileAssignment' })
  findAll() {
    return this.fileAssignmentService.findAll();
  }

  @Query(() => FileAssignment, { name: 'fileAssignment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fileAssignmentService.findOne(id);
  }

  @Mutation(() => FileAssignment)
  updateFileAssignment(@Args('updateFileAssignmentInput') updateFileAssignmentInput: UpdateFileAssignmentInput) {
    return this.fileAssignmentService.update(updateFileAssignmentInput.id, updateFileAssignmentInput);
  }

  @Mutation(() => FileAssignment)
  removeFileAssignment(@Args('id', { type: () => Int }) id: number) {
    return this.fileAssignmentService.remove(id);
  }
}
