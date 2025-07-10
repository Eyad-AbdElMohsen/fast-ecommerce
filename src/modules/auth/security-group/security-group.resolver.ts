import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Auth } from 'src/decorators/auth.decorator';
import { SecurityGroupService } from './security-group.service';
import {
  GqlSecurityArrayResponse,
  GqlSecurityResponse,
} from './responses/security-group.response';
import { CreateSecurityInput } from './input/create-group.input';
import { User } from '../user/user.entity';
import { SecurityGroup } from './security-group.entity';
import { Loader } from 'src/decorators/loader.decorator';
import DataLoader from 'dataloader';
import { GqlStringArrayResponse } from 'src/gql/graphql-response';
import { getAllPermissions } from 'src/types/security-group-permissions.type.ts';
import { UserSecurityGroupLoader } from './loader/user-security-group.loader';

@Resolver(() => SecurityGroup)
export class SecurityGroupResolver {
  constructor(private readonly securityGroupService: SecurityGroupService) {}

  //** --------------------- QUERIES --------------------- */
  @Auth({ allow: 'admin', permissions: ['READ_PERMISSIONS'] })
  @Query(() => GqlSecurityArrayResponse)
  async getSecurityGroups() {
    return await this.securityGroupService.getSecurityGroups();
  }

  @Auth({ allow: 'admin', permissions: ['READ_PERMISSIONS']})
  @Query(() => GqlStringArrayResponse)
  async getAllPermissions() {
    return getAllPermissions();
  }

  //** --------------------- MUTATIONS --------------------- */
  @Auth({ allow: 'admin', permissions: ['MANAGE_PERMISSIONS'] })
  @Mutation(() => GqlSecurityResponse)
  async createSecurityGroup(@Args('input') input: CreateSecurityInput) {
    return await this.securityGroupService.createSecurityGroup(input);
  }

  //** ------------------ RESOLVE FIELDS & DataLoaders ------------------ */
  @ResolveField(() => [User], { nullable: true })
  users(
    @Parent() securityGroup: SecurityGroup,
    @Loader(UserSecurityGroupLoader) userLoader: DataLoader<any, any>,
  ) {
    return userLoader.load(securityGroup.id);
  }
}
