import { Test, TestingModule } from '@nestjs/testing';
import { followersService } from './services/follower.service';

describe('followersService', () => {
  let service: followersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [followersService],
    }).compile();

    service = module.get<followersService>(followersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
