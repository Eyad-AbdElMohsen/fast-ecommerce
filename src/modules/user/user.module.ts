import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Order } from '../order/order.entity';
import { Cart } from '../cart/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, Cart]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
