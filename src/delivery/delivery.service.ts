import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class DeliveryService {
  constructor(private prismaService: PrismaService) {}

  async create(id_user: string, createDeliveryDto: CreateDeliveryDto) {
    const client = await this.prismaService.client.findFirst({
      where: { user_id: id_user },
    });

    if (!client) {
      throw new NotFoundException('Your user is not a client');
    }

    const delivery = await this.prismaService.delivery.create({
      data: {
        id_client: client.id,
        item_name: createDeliveryDto.item_name,
      },
    });

    return delivery;
  }

  findAll() {
    return this.prismaService.delivery.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery`;
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
