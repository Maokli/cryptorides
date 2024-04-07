import { Test, TestingModule } from '@nestjs/testing';
import { CarResolver } from './car.resolver';
import { CarService } from './car.service';

describe('CarResolver', () => {
  let resolver: CarResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarResolver, CarService],
    }).compile();

    resolver = module.get<CarResolver>(CarResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
