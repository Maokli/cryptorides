import { Test, TestingModule } from '@nestjs/testing';
import { HelpersController } from './helpers.controller';
import { HelpersService } from './helpers.service';

describe('HelpersController', () => {
  let controller: HelpersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpersController],
      providers: [HelpersService],
    }).compile();

    controller = module.get<HelpersController>(HelpersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
