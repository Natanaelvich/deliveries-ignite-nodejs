import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefreshtoken {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refresh_token: string;
}
