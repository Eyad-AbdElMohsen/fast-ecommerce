import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemResolver } from './order-item.resolver';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemService, OrderItemResolver],
  exports: [OrderItemService],
})
export class OrderItemModule {}
