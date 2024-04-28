import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileAssignment } from './entities/file-assignment.entity';
import { CreateFileAssignmentInput } from './dto/create-file-assignment.input';
import { UpdateFileAssignmentInput } from './dto/update-file-assignment.input';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileAssignmentService {
  constructor(
    @InjectRepository(FileAssignment)
    private fileAssignmentRepository: Repository<FileAssignment>,
  ) {}

  async create({ elementId, elementType, fileUrl }: CreateFileAssignmentInput): Promise<FileAssignment> {
    const fileAssignment = new FileAssignment();
    fileAssignment.fileUrl = fileUrl;
    fileAssignment.elementId = elementId;
    fileAssignment.elementType = elementType;

    const savedFileAssignment = await this.fileAssignmentRepository.save(fileAssignment);

    return savedFileAssignment;
  }

  private generateFileName(): string {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  }
  findAll() {
    return `This action returns all fileAssignment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileAssignment`;
  }

  update(id: number, updateFileAssignmentInput: UpdateFileAssignmentInput) {
    return `This action updates a #${id} fileAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileAssignment`;
  }
}

