import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const clientExists = await this.prismaService.client.findUnique({
      where: { username: createClientDto.username },
    });

    if (clientExists) {
      throw new Error('CLIENT_EXISTS');
    }

    const hashPassword = await hash(createClientDto.password, 10);

    const client = await this.prismaService.client.create({
      data: {
        username: createClientDto.username,
        password: hashPassword,
      },
      select: {
        id: true,
        username: true,
        password: false,
      },
    });

    return client;
  }

  findAll() {
    return this.prismaService.client.findMany({
      select: {
        id: true,
        username: true,
        password: false,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.client.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        password: false,
      },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const clientExists = await this.prismaService.client.findUnique({
      where: { id },
    });

    if (!clientExists) {
      throw new Error('CLIENT_NOT_FOUND');
    }

    const clientExistsWithSameUserName =
      await this.prismaService.client.findUnique({
        where: { username: updateClientDto.username },
      });

    if (
      clientExistsWithSameUserName &&
      clientExistsWithSameUserName.id !== id
    ) {
      throw new Error('CLIENT_EXISTS_WITH_USERNAME');
    }

    const hashPassword = await hash(
      updateClientDto.password || clientExists.password,
      10,
    );

    const client = await this.prismaService.client.update({
      where: { id },
      data: {
        password: hashPassword,
        username: updateClientDto.username,
      },
      select: {
        id: true,
        username: true,
        password: false,
      },
    });

    return client;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
