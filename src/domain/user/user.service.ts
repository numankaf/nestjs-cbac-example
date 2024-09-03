import { Injectable } from '@nestjs/common';
import { PasswordEncoder } from '../../common/utils/password-encoder';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    user.password = await this.passwordEncoder.encryptPassword(
      createUserDto.password,
    );
    return await this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findUserWithPermissions(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['role', 'role.permissions'],
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { user_name: username },
      relations: ['role', 'role.permissions'],
    });
  }
}
