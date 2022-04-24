import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ClientModule } from './client/client.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [DatabaseModule, ClientModule, DeliveryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
