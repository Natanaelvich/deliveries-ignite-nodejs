import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticateService } from './authenticate.service';
import { CreateAuthenticateDto } from './dto/create-authenticate.dto';

@ApiTags('authenticate')
@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post()
  async create(@Body() { password, username }: CreateAuthenticateDto) {
    try {
      const { token, refreshToken } =
        await this.authenticateService.authenticate({
          username,
          password,
        });

      return { token, refreshToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
