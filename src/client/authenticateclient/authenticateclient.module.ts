import { Module } from '@nestjs/common';
import { AuthenticateclientService } from './authenticateclient.service';
import { AuthenticateclientController } from './authenticateclient.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [AuthenticateclientController],
  providers: [AuthenticateclientService, PrismaService],
})
export class AuthenticateclientModule {}
