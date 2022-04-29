import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { CreateAuthenticateClientDto } from './dto/create-authenticateclient.dto';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthenticateclientService {
  constructor(private prismaService: PrismaService) {}

  async authenticate({ password, username }: CreateAuthenticateClientDto) {
    const client = await this.prismaService.client.findUnique({
      where: {
        username,
      },
    });

    if (!client) {
      throw new UnauthorizedException('Username or password invalid!');
    }

    const verifyPassword = await compare(password, client.password);

    if (!verifyPassword) {
      throw new UnauthorizedException('Username or password invalid!');
    }

    const token = sign(
      {
        username: username,
      },
      process.env.JWT_SECRET || 'secret',
      { subject: client.id, expiresIn: process.env.JWT_EXPIRE },
    );

    const refreshToken = sign(
      {
        username: username,
      },
      process.env.JWT_SECRET_REFRESH || 'secret',
      { subject: client.id, expiresIn: process.env.JWT_EXPIRE_REFRESH },
    );

    await this.prismaService.refreshClientToken.create({
      data: {
        id_client: client.id,
        token: refreshToken,
      },
    });

    return {
      token,
      refreshToken,
    };
  }
}
