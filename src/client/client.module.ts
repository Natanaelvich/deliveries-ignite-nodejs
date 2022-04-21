import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthenticateclientModule } from './authenticateclient/authenticateclient.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
  imports: [AuthenticateclientModule],
})
export class ClientModule {}
