import { Module } from '@nestjs/common';

import { ClientService } from '../client.service';

import { RefreshtokenclientService } from './refreshtokenclient.service';
import { RefreshtokenclientController } from './refreshtokenclient.controller';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [RefreshtokenclientController],
  providers: [RefreshtokenclientService, PrismaService, ClientService],
})
export class RefreshtokenclientModule {}
