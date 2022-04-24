import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  id_deliveryman?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  item_name: string;
}
