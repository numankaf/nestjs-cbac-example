import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from '../../role/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @ApiProperty({
    example: 'itadori',
  })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Surname cannot be empty' })
  @ApiProperty({ example: 'yuuji' })
  surname: string;

  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString()
  @ApiProperty({ example: 'itadori.yuuji' })
  user_name: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @ApiProperty({ example: 'itadori.yuuji@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @ApiProperty({ example: 'password.' })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  role: Role;
}
