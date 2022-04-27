import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import { AuthorizationGuard } from 'src/authorization.guard';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientService.create(createClientDto);
      return client;
    } catch (error) {
      if (error.message === 'CLIENT_EXISTS') {
        throw new HttpException('Client already exists', HttpStatus.CONFLICT);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch()
  @UseGuards(AuthorizationGuard)
  async update(@Request() req, @Body() updateClientDto: UpdateClientDto) {
    try {
      return await this.clientService.update(req.id, updateClientDto);
    } catch (error) {
      if (error.message === 'CLIENT_EXISTS_WITH_USERNAME') {
        throw new HttpException(
          'Client already exists with username',
          HttpStatus.CONFLICT,
        );
      }
      if (error.message === 'CLIENT_NOT_FOUND') {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
