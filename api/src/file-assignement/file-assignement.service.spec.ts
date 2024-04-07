import { Test, TestingModule } from '@nestjs/testing';
import { FileAssignementService } from './file-assignement.service';

describe('FileAssignementService', () => {
  let service: FileAssignementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileAssignementService],
    }).compile();

    service = module.get<FileAssignementService>(FileAssignementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
