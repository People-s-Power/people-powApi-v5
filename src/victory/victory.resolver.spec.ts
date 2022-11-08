import { Test, TestingModule } from '@nestjs/testing';
import { VictoryResolver } from './victory.resolver';
import { VictoryService } from './victory.service';

describe('VictoryResolver', () => {
  let resolver: VictoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VictoryResolver, VictoryService],
    }).compile();

    resolver = module.get<VictoryResolver>(VictoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
