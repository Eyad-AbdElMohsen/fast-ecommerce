import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { Order } from '../order/order.entity';
import { User } from '../auth/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Order])],
  providers: [CartService, CartResolver],
})
export class CartModule {}
