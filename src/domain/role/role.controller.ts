import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasPermissions } from '../../common/decorator/permission.decorator';
import { PermissionEnum } from '../../common/enums/permission.enum';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
@ApiBearerAuth()
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HasPermissions(PermissionEnum.ROLE_READ_WRITE)
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleService.createRole(createRoleDto);
    return role;
  }

  @Get('/:id')
  @HasPermissions(PermissionEnum.ROLE_READ_WRITE, PermissionEnum.ROLE_READ)
  async getRoleById(@Param('id') id: number): Promise<Role> {
    return await this.roleService.findRoleById(id);
  }

  @Patch('/permission/add/:roleId/:permissionId')
  @HasPermissions(PermissionEnum.ROLE_READ_WRITE)
  async addPermissionToRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ): Promise<void> {
    return await this.roleService.addPermissionToRole(roleId, permissionId);
  }

  @Delete('/permission/remove/:roleId/:permissionId')
  @HasPermissions(PermissionEnum.ROLE_READ_WRITE)
  async deletePermissionFromTable(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ): Promise<void> {
    return await this.roleService.deletePermissionFromRole(
      roleId,
      permissionId,
    );
  }
}
