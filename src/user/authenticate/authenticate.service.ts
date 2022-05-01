import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { CreateAuthenticateDto } from './dto/create-authenticate.dto';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthenticateService {
  constructor(private prismaService: PrismaService) {}

  async authenticate({ password, username }: CreateAuthenticateDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Username or password invalid!');
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new UnauthorizedException('Username or password invalid!');
    }

    const token = sign(
      {
        username: username,
      },
      process.env.JWT_SECRET || 'secret',
      { subject: user.id, expiresIn: process.env.JWT_EXPIRE },
    );

    const refreshToken = sign(
      {
        username: username,
      },
      process.env.JWT_SECRET_REFRESH || 'secret',
      { subject: user.id, expiresIn: process.env.JWT_EXPIRE_REFRESH },
    );

    await this.prismaService.refreshToken.create({
      data: {
        id_user: user.id,
        token: refreshToken,
      },
    });

    return {
      token,
      refreshToken,
    };
  }
}
