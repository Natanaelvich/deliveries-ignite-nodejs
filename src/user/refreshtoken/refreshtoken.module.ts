import { Module } from '@nestjs/common';

import { UserService } from '../user.service';

import { RefreshtokenService } from './refreshtoken.service';
import { RefreshtokenController } from './refreshtoken.controller';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [RefreshtokenController],
  providers: [RefreshtokenService, PrismaService, UserService],
})
export class RefreshtokenModule {}
