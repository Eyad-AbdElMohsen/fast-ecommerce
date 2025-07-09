import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityGroup } from './security-group.entity';
import { SecurityGroupService } from './security-group.service';
import { UserModule } from '../user/user.module';
import { SecurityGroupResolver } from './security-group.resolver';
import { SecurityGroupLoader } from './loader/security-group.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([SecurityGroup]),
    UserModule,
  ],
  providers: [SecurityGroupResolver, SecurityGroupService, SecurityGroupLoader],
  exports: [SecurityGroupService, SecurityGroupLoader],
})
export class SecurityGroupModule {}