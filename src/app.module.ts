import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [DatabaseModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
