import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateclientService } from './authenticateclient.service';

@Controller('authenticateclient')
export class AuthenticateclientController {
  constructor(
    private readonly authenticateclientService: AuthenticateclientService,
  ) {}

  @Post()
  async create(@Body() body: { username: string; password: string }) {
    const { token } = await this.authenticateclientService.authenticate(
      body.username,
      body.password,
    );

    return { token };
  }
}
