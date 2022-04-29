import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRefreshtokenclient } from './dto/create-refreshtokenclient.dto';

import { RefreshtokenclientService } from './refreshtokenclient.service';

@ApiTags('refreshtokenclient')
@Controller('refreshtokenclient')
export class RefreshtokenclientController {
  constructor(
    private readonly refreshtokenclientService: RefreshtokenclientService,
  ) {}

  @Post()
  async create(@Body() { refresh_token }: CreateRefreshtokenclient) {
    try {
      const refreshToken = await this.refreshtokenclientService.refresh({
        refresh_token,
      });

      return refreshToken;
    } catch (error) {
      if (error.message === 'NOT_FOUND_CLIENT') {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }
      if (error.message === 'NOT_FOUND_REFRESH_TOKEN') {
        throw new HttpException(
          'Refresh token not found',
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
