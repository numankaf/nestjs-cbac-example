import { Injectable } from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { PermissionService } from '../permission/permission.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionService: PermissionService,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const permissions = await this.permissionService.findByIds(
      createRoleDto.permissions,
    );
    const role = this.roleRepository.create({
      ...createRoleDto,
      permissions: permissions,
    });
    return await this.roleRepository.save(role);
  }

  async findRoleById(id: number): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { id: id },
      relations: ['permissions'],
    });
  }

  async addPermissionToRole(roleId: number, permissionId: number) {
    const queryRunner = this.roleRepository.manager;
    const query = `
        INSERT INTO role_permission(permission_id, role_id)
        VALUES ($1, $2)
    `;
    try {
      await queryRunner.query(query, [roleId, permissionId]);
    } catch (error) {
      throw new RuntimeException('Unknown error');
    }
  }

  async deletePermissionFromRole(roleId: number, permissionId: number) {
    const queryRunner = this.roleRepository.manager;
    const query = `
        DELETE FROM role_permission rp
        WHERE rp.role_id = $1 
        AND rp.permission_id = $2
    `;
    try {
      await queryRunner.query(query, [roleId, permissionId]);
    } catch (error) {
      throw new RuntimeException('Unknown error');
    }
  }
}
