import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findUserByUsername(loginDto.user_name);
    if (!user) {
      throw new UnauthorizedException('Username does not exist');
    }
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Username or password is wrong!');
    }
    const payload = {
      sub: user.id,
      user_name: user.user_name,
    };

    const response: LoginResponseDto = {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    } as LoginResponseDto;
    return response;
  }
}
