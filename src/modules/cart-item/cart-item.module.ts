import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemService } from './cart-item.service';
import { CartItemResolver } from './cart-item.resolver';
import { CartItem } from './cart-item.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartItemService, CartItemResolver],
})
export class CartItemModule {}
