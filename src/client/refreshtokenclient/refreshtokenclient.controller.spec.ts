import { Test, TestingModule } from '@nestjs/testing';
import { RefreshtokenclientController } from './refreshtokenclient.controller';
import { RefreshtokenclientService } from './refreshtokenclient.service';

describe('RefreshtokenclientController', () => {
  let controller: RefreshtokenclientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshtokenclientController],
      providers: [RefreshtokenclientService],
    }).compile();

    controller = module.get<RefreshtokenclientController>(RefreshtokenclientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
