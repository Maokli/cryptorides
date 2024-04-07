import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileAssignment } from './entities/fileAssignment.entity';
// import { Upload } from './scalars/upload.scalar';

@Module({
  imports: [TypeOrmModule.forFeature([User, FileAssignment])],
  // exports: [Upload, 
    // nzid nexporti l fileassignment walle? 
   // ]
})
export class SharedModule {}
