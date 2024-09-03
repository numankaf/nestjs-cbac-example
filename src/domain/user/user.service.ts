import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEncoder } from '../../common/utils/password-encoder';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.password = await this.passwordEncoder.encryptPassword(
      createUserDto.password,
    );
    return await this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { user_name: username },
    });
  }
}
