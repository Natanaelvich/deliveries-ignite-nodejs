import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { AuthenticateModule } from './authenticate/authenticate.module';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [AuthenticateModule, RefreshtokenModule],
})
export class UserModule {}
