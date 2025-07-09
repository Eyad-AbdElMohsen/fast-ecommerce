import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuards } from '.';
import { SecurityGroupService } from 'src/modules/auth/security-group/security-group.service';
import { UserService } from 'src/modules/auth/user/user.service';
import { AuthOpts } from 'src/decorators/auth.decorator';

@Injectable()
export class MediatorGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly securityService: SecurityGroupService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authOpts =
      this.reflector.get<AuthOpts>('authOpts', context.getHandler()) ||
      this.reflector.get<AuthOpts>('authOpts', context.getClass());
    const guard = new AuthGuards[authOpts.allow || 'user'](
      authOpts,
      this.userService,
    );
    return guard.canActivate(context);
  }
}
