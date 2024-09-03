import { Controller, Get } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasPermissions } from '../../common/decorator/permission.decorator';
import { PermissionEnum } from '../../common/enums/permission.enum';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Controller('permission')
@ApiBearerAuth()
@ApiTags('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @HasPermissions(PermissionEnum.PERMISSION_READ)
  @Get('/all')
  async findAll(): Promise<Permission[]> {
    return await this.permissionService.findAll();
  }
}
