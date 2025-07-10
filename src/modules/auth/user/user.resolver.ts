import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './input/create-user.input';
import { LoginInput } from './input/login-input';
import { GqlUserResponse, GqlUsersResponse } from './responses/user.response';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/auth-user.decorator';
import { GqlBooleanResponse } from 'src/gql/graphql-response';
import { getAllPermissions } from 'src/types/security-group-permissions.type.ts';
import { SecurityGroupService } from '../security-group/security-group.service';
import { CreateAdminInput } from './input/create-admin.input';
import { SecurityGroup } from '../security-group/security-group.entity';
import { Loader } from 'src/decorators/loader.decorator';
import DataLoader from 'dataloader';
import { SecurityGroupUserLoader } from './loader/security-group-user.loader.ts';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly securityService: SecurityGroupService,
  ) {}

  //** --------------------- QUERIES --------------------- */
  @Auth({ allow: 'admin', permissions: ['READ_USERS', 'READ_PERMISSIONS'] })
  @Query(() => GqlUserResponse)
  async getUser(@Args('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Auth({ allow: 'admin', permissions: ['READ_USERS', 'READ_PERMISSIONS'] })
  @Query(() => GqlUsersResponse)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Auth({ allow: 'authenticated' })
  @Query(() => GqlUserResponse)
  async getMe(@CurrentUser() user: User) {
    return await this.userService.getUserById(user.id);
  }

  @Auth({
    allow: 'admin',
    permissions: ['READ_PERMISSIONS', 'ASSIGN_SECURITY_GROUP'],
  })
  @Query(() => GqlUsersResponse)
  async getAdmins() {
    return await this.userService.getAdmins();
  }
  //** --------------------- MUTATIONS --------------------- */
  @Mutation(() => GqlUserResponse)
  async register(@Args('input') input: CreateUserInput) {
    return await this.userService.register(input);
  }

  @Mutation(() => GqlUserResponse)
  async login(@Args('input') input: LoginInput) {
    return await this.userService.login(input);
  }

  @Mutation(() => GqlBooleanResponse)
  async seedAdmin() {
    const security = await this.securityService.findOrCreate({
      permissions: getAllPermissions(),
      groupName: 'superAdmin',
      isActive: true,
    });
    await this.userService.updateOrCreate(security.id);
    return true;
  }

  @Auth({
    allow: 'admin',
    permissions: ['CREATE_ADMIN', 'ASSIGN_SECURITY_GROUP'],
  })
  @Mutation(() => GqlUserResponse)
  async createAdmin(@Args('input') input: CreateAdminInput) {
    const securityGroup = await this.securityService.findOneById(
      input.securityGroupId,
    );
    if (!securityGroup)
      throw new HttpException('No Security Group Found', HttpStatus.NOT_FOUND);

    const user = await this.userService.createAdmin(input);

    return user;
  }

  //** ------------------ RESOLVE FIELDS & DataLoaders ------------------ */

  @ResolveField(() => SecurityGroup, { nullable: true })
  securityGroup(
    @Parent() user: User,
    @Loader(SecurityGroupUserLoader) securityGroupLoader: DataLoader<any, any>,
  ) {
    if (user.securityGroupId)
      return securityGroupLoader.load(user.securityGroupId);
  }
}
