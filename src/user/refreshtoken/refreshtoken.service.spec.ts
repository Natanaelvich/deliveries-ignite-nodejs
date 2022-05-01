import { Test, TestingModule } from '@nestjs/testing';

import { RefreshtokenService } from './refreshtoken.service';

describe('RefreshtokenService', () => {
  let service: RefreshtokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshtokenService],
    }).compile();

    service = module.get<RefreshtokenService>(RefreshtokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
