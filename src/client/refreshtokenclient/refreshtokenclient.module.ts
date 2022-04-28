import { Module } from '@nestjs/common';

import { RefreshtokenclientService } from './refreshtokenclient.service';
import { RefreshtokenclientController } from './refreshtokenclient.controller';

@Module({
  controllers: [RefreshtokenclientController],
  providers: [RefreshtokenclientService],
})
export class RefreshtokenclientModule {}
