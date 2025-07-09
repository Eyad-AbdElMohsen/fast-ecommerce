import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './input/create-user.input';
import { LoginInput } from './input/login-input';
import { GqlUserResponse, GqlUsersResponse } from './responses/user.response';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //** --------------------- QUERIES --------------------- */

  @Query(() => GqlUserResponse)
  async getUser(@Args('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Query(() => GqlUsersResponse)
  async getAllUsers() {
    return await this.userService.getAllUsers();
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

  //** ------------------ RESOLVE FIELDS & DataLoaders ------------------ */
}
