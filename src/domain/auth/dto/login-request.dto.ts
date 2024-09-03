import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'mus' })
  user_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Sifre123.' })
  password: string;
}
