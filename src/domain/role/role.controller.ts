import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
@ApiBearerAuth()
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleService.createRole(createRoleDto);
    return role;
  }

  @Get('/:id')
  async getRoleById(@Param('id') id: number): Promise<Role> {
    return await this.roleService.findRoleById(id);
  }
}
