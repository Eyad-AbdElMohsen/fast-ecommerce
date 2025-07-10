import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Order } from '../../order/order.entity';
import { Cart } from '../../cart/cart.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SecurityGroupModule } from '../security-group/security-group.module';
import { UserSecurityGroupLoader } from '../security-group/loader/user-security-group.loader';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, Cart]),
    ConfigModule,
    forwardRef(() => SecurityGroupModule),
  ],
  providers: [UserService, UserResolver, UserSecurityGroupLoader],
  exports: [UserService, UserSecurityGroupLoader],
})
export class UserModule {}
