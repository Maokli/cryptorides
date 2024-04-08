import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileAssignmentService } from './file-assignment.service';
import { FileAssignment } from './entities/file-assignment.entity';
import { FileAssignmentResolver } from './file-assignment.resolver'; 

@Module({
  imports: [TypeOrmModule.forFeature([FileAssignment])],
  providers: [FileAssignmentService, FileAssignmentResolver], 
  exports: [FileAssignmentService],
})
export class FileAssignmentModule {}