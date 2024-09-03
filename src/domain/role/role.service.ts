import { Injectable } from '@nestjs/common';
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
}
