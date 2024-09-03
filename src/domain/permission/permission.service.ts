import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async findByIds(ids: number[]): Promise<Permission[]> {
    return await this.permissionRepository.find({
      where: { id: In([...ids]) },
    });
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }
}
