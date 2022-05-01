import { Module } from '@nestjs/common';

import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [AuthenticateController],
  providers: [AuthenticateService, PrismaService],
})
export class AuthenticateModule {}
