import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SecurityGroupService } from 'src/modules/auth/security-group/security-group.service';
import { AuthGuards } from '..';
import { AuthOpts } from 'src/decorators/auth.decorator';

@Injectable()
export class MediatorGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly securityGroupService: SecurityGroupService,
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authOpts =
      this.reflector.get<AuthOpts>('authOpts', context.getHandler()) ||
      this.reflector.get<AuthOpts>('authOpts', context.getClass());

    const guard = new AuthGuards[authOpts.allow || 'authenticated'](
      authOpts,
      this.securityGroupService,
    );
    return guard.canActivate(context);
  }
}
