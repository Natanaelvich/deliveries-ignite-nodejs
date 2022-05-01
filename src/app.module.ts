import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { DeliveryModule } from './delivery/delivery.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, DeliveryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
