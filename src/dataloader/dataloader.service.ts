import { Injectable } from '@nestjs/common';
import { SecurityGroupLoader } from 'src/modules/auth/security-group/loader/security-group.loader';
import { UserLoader } from 'src/modules/auth/user/loader/user.loader';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly securityGroupLoader: SecurityGroupLoader,
    private readonly userLoader: UserLoader,
  ) {}

  createLoaders() {
    const loaders = {
      securityGroupLoader: this.securityGroupLoader.generateDataLoader(),
      userSecurityGroupLoader: this.userLoader.generateDataLoader(),
    };
    return loaders;
  }
}
