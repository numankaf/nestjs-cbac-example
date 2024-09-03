import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { Role } from '../role/role.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false, unique: true })
  user_name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
