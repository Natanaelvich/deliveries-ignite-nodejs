import { Injectable } from '@nestjs/common';

import { sign, verify } from 'jsonwebtoken';

import { ClientService } from '../client.service';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class RefreshtokenclientService {
  constructor(
    private clientService: ClientService,
    private prismaService: PrismaService,
  ) {}

  async refresh({ refresh_token }: { refresh_token: string }) {
    const { sub } = verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH || 'secret',
    ) as { sub: string };

    const client = await this.clientService.findOne(sub);

    if (!client) {
      throw new Error('NOT_FOUND_CLIENT');
    }

    const refreshTokenExists =
      await this.prismaService.refreshClientToken.findFirst({
        where: {
          id_client: client.id,
          token: refresh_token,
        },
      });

    if (!refreshTokenExists) {
      throw new Error('NOT_FOUND_REFRESH_TOKEN');
    } else {
      await this.prismaService.refreshClientToken.delete({
        where: {
          id: refreshTokenExists.id,
        },
      });
    }

    const newRefreshToken = sign(
      {
        username: client.username,
      },
      process.env.JWT_SECRET_REFRESH || 'secret',
      { subject: client.id, expiresIn: process.env.JWT_EXPIRE_REFRESH },
    );

    const newToken = sign(
      {
        username: client.username,
      },
      process.env.JWT_SECRET || 'secret',
      { subject: client.id, expiresIn: process.env.JWT_EXPIRE },
    );

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}
