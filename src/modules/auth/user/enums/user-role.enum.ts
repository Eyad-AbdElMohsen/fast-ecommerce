import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
});
