import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Order } from '../../order/order.entity';
import { Cart } from '../../cart/cart.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SecurityGroupModule } from '../security-group/security-group.module';
import { AdminGuard } from 'src/guards/strategies/admin.guard';
import { UserLoader } from './loader/user.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, Cart]),
    ConfigModule,
    forwardRef(() => SecurityGroupModule),
  ],
  providers: [UserService, UserResolver, UserLoader],
  exports: [UserService, UserLoader],
})
export class UserModule {}
