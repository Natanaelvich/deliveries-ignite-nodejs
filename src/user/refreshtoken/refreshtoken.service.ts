import { Injectable, NotFoundException } from '@nestjs/common';

import { sign, verify } from 'jsonwebtoken';

import { UserService } from '../user.service';

import { CreateRefreshtokenDto } from './dto/create-refreshtoken.dto';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class RefreshtokenService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  async refresh({ refresh_token }: CreateRefreshtokenDto) {
    const { sub } = verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH || 'secret',
    ) as { sub: string };

    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const refreshTokenExists = await this.prismaService.refreshToken.findFirst({
      where: {
        id_user: user.id,
        token: refresh_token,
      },
    });

    if (!refreshTokenExists) {
      throw new NotFoundException('Refresh token not found');
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
