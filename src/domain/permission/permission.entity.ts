import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { Role } from '../role/role.entity';

@Entity()
export class Permission extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  detail: string;

  @ManyToMany(() => Role, (role) => role.permissions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  roles: Role[];
}
