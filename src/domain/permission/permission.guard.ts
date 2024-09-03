import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';
import { PERMISSONS_ALLOWED } from '../../common/constants/constants';
import { PermissionEnum } from './../../common/enums/permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly clsService: ClsService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSONS_ALLOWED, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }
    const permissions: PermissionEnum[] = this.clsService.get('permissions');
    return requiredPermissions.some((p) => permissions.includes(p));
  }
}
