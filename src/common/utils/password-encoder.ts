import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncoder {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async isOldPasswordValid(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    const isOldPasswordValid = await bcrypt.compare(
      password,
      encryptedPassword,
    );
    return isOldPasswordValid;
  }
}
