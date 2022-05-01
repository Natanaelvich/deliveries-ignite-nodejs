import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticateService } from './authenticate.service';
import { CreateAuthenticateDto } from './dto/create-authenticate.dto';

@ApiTags('authenticate')
@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post()
  async create(@Body() { password, username }: CreateAuthenticateDto) {
    const { token, refreshToken } = await this.authenticateService.authenticate(
      {
        username,
        password,
      },
    );

    return { token, refreshToken };
  }
}
