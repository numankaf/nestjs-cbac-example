import { ConflictException } from '@nestjs/common';
import {
  BeforeRemove,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { User } from '../user/user.entity';
import { Permission } from './../permission/permission.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

  @BeforeRemove()
  async beforeRemove() {
    const userList = this.users;

    if (userList && userList.length > 0) {
      throw new ConflictException(
        'Cannot delete this role, There are users that has this role.',
      );
    }
  }
}
