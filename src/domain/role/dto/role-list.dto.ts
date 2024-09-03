import { Expose } from 'class-transformer';
export class RoleListDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
