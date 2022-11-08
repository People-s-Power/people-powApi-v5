import { Test, TestingModule } from '@nestjs/testing';
import { AdvertResolver } from './advert.resolver';
import { AdvertService } from './advert.service';

describe('AdvertResolver', () => {
  let resolver: AdvertResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvertResolver, AdvertService],
    }).compile();

    resolver = module.get<AdvertResolver>(AdvertResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
