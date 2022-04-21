import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateclientController } from './authenticateclient.controller';
import { AuthenticateclientService } from './authenticateclient.service';

describe('AuthenticateclientController', () => {
  let controller: AuthenticateclientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticateclientController],
      providers: [AuthenticateclientService],
    }).compile();

    controller = module.get<AuthenticateclientController>(
      AuthenticateclientController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
