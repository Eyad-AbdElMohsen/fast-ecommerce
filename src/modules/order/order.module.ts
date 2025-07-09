import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './order.service';
import { OrdersResolver } from './order.resolver';
import { User } from '../auth/user/user.entity';
import { Cart } from '../cart/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Cart])],
  providers: [OrdersService, OrdersResolver],
})
export class OrderModule {}
