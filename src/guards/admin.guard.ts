import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthOpts } from 'src/decorators/auth.decorator';
import { SecurityGroupService } from 'src/modules/auth/security-group/security-group.service';
import { UserService } from 'src/modules/auth/user/user.service';


export class AdminGuard implements CanActivate {
  constructor(
    private readonly authOpts: AuthOpts,
    private readonly userService: UserService,
    private readonly securityService: SecurityGroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { permissions } = this.authOpts;
    if (!permissions?.length) return true
    const ctx = GqlExecutionContext.create(context);
    const { currentUser } = ctx.getContext();

    if (!currentUser) throw new Error('UNAUTHORIZED');

    const user = await this.userService.getUserByEmail(currentUser.email);
    if (!user || !user.securityGroupId) throw new Error('UNAUTHORIZED');

    const securityGroup = await this.securityService.findOneById(user.securityGroupId)
    if(!securityGroup) throw new Error('UNAUTHORIZED');

    return permissions.some((p) => securityGroup.permissions.includes(p));
  }
}
