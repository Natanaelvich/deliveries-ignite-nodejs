import { Module } from '@nestjs/common';

import { ClientService } from './client.service';
import { ClientController } from './client.controller';

import { AuthenticateclientModule } from './authenticateclient/authenticateclient.module';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
  imports: [AuthenticateclientModule],
})
export class ClientModule {}
