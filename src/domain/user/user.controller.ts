import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserService } from './user.service';
@Controller('user')
//@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDetailDto> {
    const user = await this.userService.createUser(createUserDto);
    return plainToClass(UserDetailDto, user, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}
