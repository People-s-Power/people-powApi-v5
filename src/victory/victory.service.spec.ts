import { Test, TestingModule } from '@nestjs/testing';
import { VictoryService } from './victory.service';

describe('VictoryService', () => {
  let service: VictoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VictoryService],
    }).compile();

    service = module.get<VictoryService>(VictoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
