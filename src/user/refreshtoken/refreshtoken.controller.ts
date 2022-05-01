import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRefreshtoken } from './dto/create-refreshtoken.dto';

import { RefreshtokenService } from './refreshtoken.service';

@ApiTags('refreshtoken')
@Controller('refreshtoken')
export class RefreshtokenController {
  constructor(private readonly refreshtokenService: RefreshtokenService) {}

  @Post()
  async create(@Body() { refresh_token }: CreateRefreshtoken) {
    try {
      const refreshToken = await this.refreshtokenService.refresh({
        refresh_token,
      });

      return refreshToken;
    } catch (error) {
      if (error.message === 'NOT_FOUND_') {
        throw new HttpException(' not found', HttpStatus.NOT_FOUND);
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
