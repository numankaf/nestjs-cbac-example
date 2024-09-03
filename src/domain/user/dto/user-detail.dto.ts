import { Expose, Type } from 'class-transformer';
import { RoleListDto } from '../../role/dto/role-list.dto';
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

  @Expose()
  @Type(() => RoleListDto)
  role: RoleListDto;
}
