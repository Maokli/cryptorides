import { Test, TestingModule } from '@nestjs/testing';
import { FileAssignmentService } from './file-assignment.service';

describe('FileAssignmentService', () => {
  let service: FileAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileAssignmentService],
    }).compile();

    service = module.get<FileAssignmentService>(FileAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
