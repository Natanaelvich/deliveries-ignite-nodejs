import { Body, Controller, Post } from '@nestjs/common';
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
    const { token } = await this.authenticateclientService.authenticate({
      username,
      password,
    });

    return { token };
  }
}
