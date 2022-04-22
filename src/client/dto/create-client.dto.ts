import { IsNotEmpty, IsString } from 'class-validator';
export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
