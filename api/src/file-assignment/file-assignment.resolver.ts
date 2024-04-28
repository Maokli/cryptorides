import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileAssignmentService } from './file-assignment.service';
import { FileAssignment } from './entities/file-assignment.entity';
import { CreateFileAssignmentInput } from './dto/create-file-assignment.input';
import { UpdateFileAssignmentInput } from './dto/update-file-assignment.input';
import { entityType } from '../shared/enum/entityType.enum';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
@Resolver(() => FileAssignment)
export class FileAssignmentResolver {
  constructor(private readonly fileAssignmentService: FileAssignmentService) {}

  @Mutation(() => FileAssignment)
  async createFileAssignment(
    @Args('fileUrl', { type: () => String }) fileUrl: string,
    @Args('elementId', { type: () => Int }) elementId: number,
    @Args('elementType', { type: () => entityType }) elementType: entityType,
  ): Promise<FileAssignment> {
    return this.fileAssignmentService.create({ fileUrl, elementId, elementType });
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
