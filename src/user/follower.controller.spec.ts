import { Test, TestingModule } from '@nestjs/testing';
import { FollowerController } from './controllers/follower.controller';

describe('FollowerController', () => {
  let controller: FollowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowerController],
    }).compile();

    controller = module.get<FollowerController>(FollowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
