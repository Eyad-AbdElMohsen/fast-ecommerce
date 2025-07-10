import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityGroup } from './security-group.entity';
import { SecurityGroupService } from './security-group.service';
import { UserModule } from '../user/user.module';
import { SecurityGroupResolver } from './security-group.resolver';
import { SecurityGroupUserLoader } from '../user/loader/security-group-user.loader.ts';

@Module({
  imports: [
    TypeOrmModule.forFeature([SecurityGroup]),
    UserModule,
  ],
  providers: [SecurityGroupResolver, SecurityGroupService, SecurityGroupUserLoader],
  exports: [SecurityGroupService, SecurityGroupUserLoader],
})
export class SecurityGroupModule {}