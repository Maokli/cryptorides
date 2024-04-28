import { Test, TestingModule } from '@nestjs/testing';
import { FileAssignmentResolver } from './file-assignment.resolver';
import { FileAssignmentService } from './file-assignment.service';

describe('FileAssignmentResolver', () => {
  let resolver: FileAssignmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileAssignmentResolver, FileAssignmentService],
    }).compile();

    resolver = module.get<FileAssignmentResolver>(FileAssignmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
