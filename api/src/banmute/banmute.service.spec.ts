import { Test, TestingModule } from '@nestjs/testing';
import { BanmuteService } from './banmute.service';

describe('BanmuteService', () => {
  let service: BanmuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BanmuteService],
    }).compile();

    service = module.get<BanmuteService>(BanmuteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
