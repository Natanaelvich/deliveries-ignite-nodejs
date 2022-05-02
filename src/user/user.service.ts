import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashPassword = await hash(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        password: hashPassword,
      },
      select: {
        id: true,
        username: true,
        password: false,
      },
    });

    return user;
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        password: false,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        password: false,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const userExistsWithSameUserName = await this.prismaService.user.findUnique(
      {
        where: { username: updateUserDto.username },
      },
    );

    if (userExistsWithSameUserName && userExistsWithSameUserName.id !== id) {
      throw new ConflictException('Client alread exists with user name');
    }

    const hashPassword = await hash(
      updateUserDto.password || userExists.password,
      10,
    );

    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        password: hashPassword,
        username: updateUserDto.username,
      },
      select: {
        id: true,
        username: true,
        password: false,
      },
    });

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
