import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticateclientService } from './authenticateclient.service';
import { CreateAuthenticateClientDto } from './dto/create-authenticateclient.dto';

@ApiTags('authenticateclient')
@Controller('authenticateclient')
export class AuthenticateclientController {
  constructor(
    private readonly authenticateclientService: AuthenticateclientService,
  ) {}

  @Post()
  async create(@Body() { password, username }: CreateAuthenticateClientDto) {
    try {
      const { token, refreshToken } =
        await this.authenticateclientService.authenticate({
          username,
          password,
        });

      return { token, refreshToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
