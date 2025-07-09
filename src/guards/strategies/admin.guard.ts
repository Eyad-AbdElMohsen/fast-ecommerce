import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthOpts } from 'src/decorators/auth.decorator';
import { SecurityGroupService } from 'src/modules/auth/security-group/security-group.service';
import { User } from 'src/modules/auth/user/user.entity';

export class AdminGuard implements CanActivate {
  constructor(
    private readonly authOpts: AuthOpts,
    private readonly securityService: SecurityGroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { permissions } = this.authOpts;
    if (!permissions?.length) return true;
    const ctx = GqlExecutionContext.create(context);
    const { currentUser } = ctx.getContext() as { currentUser: User | null };

    if (!currentUser || !currentUser.securityGroupId)
      throw new Error('UNAUTHORIZED');

    const securityGroup = await this.securityService.findOneById(
      currentUser.securityGroupId,
    );
    if (!securityGroup) throw new Error('UNAUTHORIZED');

    return permissions.some((p) => securityGroup.permissions.includes(p));
  }
}
