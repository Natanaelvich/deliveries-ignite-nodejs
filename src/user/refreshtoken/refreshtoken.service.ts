import { Injectable } from '@nestjs/common';

import { sign, verify } from 'jsonwebtoken';

import { UserService } from '../user.service';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class RefreshtokenService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  async refresh({ refresh_token }: { refresh_token: string }) {
    const { sub } = verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH || 'secret',
    ) as { sub: string };

    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new Error('NOT_FOUND_');
    }

    const refreshTokenExists = await this.prismaService.refreshToken.findFirst({
      where: {
        id: user.id,
        token: refresh_token,
      },
    });

    if (!refreshTokenExists) {
      throw new Error('NOT_FOUND_REFRESH_TOKEN');
    } else {
      await this.prismaService.refreshToken.delete({
        where: {
          id: refreshTokenExists.id,
        },
      });
    }

    const newRefreshToken = sign(
      {
        username: user.username,
      },
      process.env.JWT_SECRET_REFRESH || 'secret',
      { subject: user.id, expiresIn: process.env.JWT_EXPIRE_REFRESH },
    );

    const newToken = sign(
      {
        username: user.username,
      },
      process.env.JWT_SECRET || 'secret',
      { subject: user.id, expiresIn: process.env.JWT_EXPIRE },
    );

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}
