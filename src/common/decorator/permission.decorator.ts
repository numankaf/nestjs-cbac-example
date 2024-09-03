import { SetMetadata } from '@nestjs/common';
import { PERMISSONS_ALLOWED } from '../constants/constants';
import { PermissionEnum } from '../enums/permission.enum';

export const HasPermissions = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSONS_ALLOWED, permissions);
