import { Test, TestingModule } from '@nestjs/testing';

import { RefreshtokenController } from './refreshtoken.controller';
import { RefreshtokenService } from './refreshtoken.service';

describe('RefreshtokenController', () => {
  let controller: RefreshtokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshtokenController],
      providers: [RefreshtokenService],
    }).compile();

    controller = module.get<RefreshtokenController>(RefreshtokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
