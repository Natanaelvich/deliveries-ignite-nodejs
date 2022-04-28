import { Test, TestingModule } from '@nestjs/testing';

import { RefreshtokenclientService } from './refreshtokenclient.service';

describe('RefreshtokenclientService', () => {
  let service: RefreshtokenclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshtokenclientService],
    }).compile();

    service = module.get<RefreshtokenclientService>(RefreshtokenclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
