import { Resolver } from '@nestjs/graphql';
import { CartItemService } from './cart-item.service';

@Resolver()
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) {}
}
