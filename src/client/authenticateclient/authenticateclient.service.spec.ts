import { Test, TestingModule } from '@nestjs/testing';

import { AuthenticateclientService } from './authenticateclient.service';

describe('AuthenticateclientService', () => {
  let service: AuthenticateclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticateclientService],
    }).compile();

    service = module.get<AuthenticateclientService>(AuthenticateclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
