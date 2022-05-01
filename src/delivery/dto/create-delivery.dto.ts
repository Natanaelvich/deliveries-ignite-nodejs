import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  item_name: string;
}
