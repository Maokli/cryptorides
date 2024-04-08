import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileAssignmentService } from './file-assignment.service';
import { FileAssignment } from './entities/file-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileAssignment])],
  providers: [FileAssignmentService],
  exports: [FileAssignmentService],
})
export class FileAssignmentModule {}