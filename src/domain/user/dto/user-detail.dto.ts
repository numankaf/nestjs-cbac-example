import { Expose } from 'class-transformer';
export class UserDetailDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  user_name: string;

  @Expose()
  email: string;
}
