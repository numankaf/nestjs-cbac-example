import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../../permission/permission.entity';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @ApiProperty({
    example: 'NEW_ROLE',
  })
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'Permissions',
  })
  permissions: Permission[];
}
