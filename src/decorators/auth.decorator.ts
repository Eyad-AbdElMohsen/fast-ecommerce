import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuards } from 'src/guards';
import { MediatorGuard } from 'src/guards/mediator-guard/mediator.guard';
import { PermissionType } from 'src/types/security-group-permissions.type.ts';

export interface AuthOpts {
  allow?: keyof typeof AuthGuards;
  permissions?: PermissionType[];
}

export const SetAuthOpts = (opts: AuthOpts) => SetMetadata('authOpts', opts);

export const Auth = (opts: AuthOpts = { allow: 'authenticated' }) =>
  applyDecorators(SetMetadata('authOpts', opts), UseGuards(MediatorGuard));
