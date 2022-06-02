import { Test, TestingModule } from '@nestjs/testing';
import { BanmuteController } from './banmute.controller';

describe('BanmuteController', () => {
  let controller: BanmuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanmuteController],
    }).compile();

    controller = module.get<BanmuteController>(BanmuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
