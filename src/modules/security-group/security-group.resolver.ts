import { Resolver } from '@nestjs/graphql';
import { SecurityGroupService } from './security-group.service';

@Resolver()
export class SecurityGroupResolver {
  constructor(private readonly securityGroupService: SecurityGroupService) {}
}
