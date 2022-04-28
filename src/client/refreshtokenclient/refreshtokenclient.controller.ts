import { Body, Controller, Post } from '@nestjs/common';
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
    const refreshToken = await this.refreshtokenclientService.refresh({
      refresh_token,
    });

    return refreshToken;
  }
}
