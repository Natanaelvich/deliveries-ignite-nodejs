import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRefreshtokenDto } from './dto/create-refreshtoken.dto';

import { RefreshtokenService } from './refreshtoken.service';

@ApiTags('refreshtoken')
@Controller('refreshtoken')
export class RefreshtokenController {
  constructor(private readonly refreshtokenService: RefreshtokenService) {}

  @Post()
  async create(@Body() { refresh_token }: CreateRefreshtokenDto) {
    const refreshToken = await this.refreshtokenService.refresh({
      refresh_token,
    });

    return refreshToken;
  }
}
