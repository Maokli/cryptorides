import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FileAssignment } from './entities/file-assignment.entity';
import { CreateFileAssignmentInput } from './dto/create-file-assignment.input';
import { UpdateFileAssignmentInput } from './dto/update-file-assignment.input';
import { join } from 'path';
import * as fs from 'fs';
import { entityType } from 'src/shared/enum/entityType.enum';

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

  async findAllByCarId(carId: number) {
    return await this.fileAssignmentRepository.find({where: {elementId: carId, elementType: entityType.Car}}) ;
  }

  async findOne(id: number): Promise<FileAssignment | null> {
    return await this.fileAssignmentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFileAssignmentInput: UpdateFileAssignmentInput): Promise<FileAssignment> {
    const fileAssignment = await this.fileAssignmentRepository.findOne({ where: { id } });
    if (!fileAssignment) {
      throw new Error('File assignment not found');
    }
    fileAssignment.fileUrl = updateFileAssignmentInput.fileUrl;

    
    return await this.fileAssignmentRepository.save(fileAssignment);
  }

  async deleteByUrl(urls: string[]): Promise<boolean> {
    console.log('urls:', urls);
  
    if (urls === null || urls === undefined) {
      console.error("Error deleting file assignments: urls is null or undefined");
      return false;
    }
  
    try {
      
      
      await this.fileAssignmentRepository.delete({ fileUrl: In(urls) });
      return true;
    } catch (error) {
      console.error("Error deleting file assignments:", error);
      return false; 
    }
  }

  remove(id: number) {
    return `This action removes a #${id} fileAssignment`;
  }
}

