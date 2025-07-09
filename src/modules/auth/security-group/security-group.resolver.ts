import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/decorators/auth.decorator';
import { SecurityGroupService } from './security-group.service';
import {
  GqlSecurityArrayResponse,
  GqlSecurityResponse,
} from './responses/security-group.response';
import { CreateSecurityInput } from './input/create-group.input';

@Resolver()
export class SecurityResolver {
  constructor(private readonly securityGroupService: SecurityGroupService) {}

  //** --------------------- QUERIES --------------------- */
  @Auth({ allow: 'admin', permissions: ['READ_PERMISSIONS'] })
  @Query(() => GqlSecurityArrayResponse)
  async getSecurityGroups() {
    return await this.securityGroupService.getSecurityGroups();
  }

  //** --------------------- MUTATIONS --------------------- */
  @Auth({ allow: 'admin', permissions: ['MANAGE_PERMISSIONS'] })
  @Mutation(() => GqlSecurityResponse)
  async createSecurityGroup(@Args('input') input: CreateSecurityInput) {
    return await this.securityGroupService.createSecurityGroup(input);
  }

  //** ------------------ RESOLVE FIELDS & DataLoaders ------------------ */
}
