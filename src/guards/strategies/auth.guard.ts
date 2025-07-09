import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthOpts } from 'src/decorators/auth.decorator';
import { SecurityGroupService } from 'src/modules/auth/security-group/security-group.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly authOpts: AuthOpts,
    private readonly securityService: SecurityGroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { currentUser } = ctx.getContext();
    if (!currentUser) throw new Error('UNAUTHORIZED');
    return true;
  }
}
