import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private prismaService: PrismaService) {}

  create(id_client: string, createDeliveryDto: CreateDeliveryDto) {
    return this.prismaService.delivery.create({
      data: { id_client, ...createDeliveryDto },
    });
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
