import { Module, forwardRef } from '@nestjs/common';
import { SecurityGroupModule } from '../modules/auth/security-group/security-group.module';
import { UserModule } from '../modules/auth/user/user.module';
// import { DataLoaderService } from './dataloader.service';

@Module({
  imports: [
    forwardRef(() => SecurityGroupModule),
    forwardRef(() => UserModule),
  ],
  // providers: [DataLoaderService],
  // exports: [DataLoaderService],
})
export class DataLoaderModule {}