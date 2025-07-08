import { Resolver } from '@nestjs/graphql';
import { OrdersService } from './order.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}
}
