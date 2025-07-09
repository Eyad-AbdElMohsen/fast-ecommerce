import { Module } from '@nestjs/common';
import { SecurityGroupService } from './security-group.service';
import { SecurityGroupResolver } from './security-group.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityGroup } from './security-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityGroup])],
  providers: [SecurityGroupService, SecurityGroupResolver],
})
export class SecurityGroupModule {}
