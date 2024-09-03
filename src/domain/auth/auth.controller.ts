import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../../common/decorator/skip-auth.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
@SkipAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }
}
