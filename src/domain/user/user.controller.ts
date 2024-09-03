import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserService } from './user.service';
@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDetailDto> {
    const user = await this.userService.createUser(createUserDto);
    return plainToClass(UserDetailDto, user, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<UserDetailDto> {
    const user = await this.userService.getUserById(id);
    return plainToClass(UserDetailDto, user, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}
