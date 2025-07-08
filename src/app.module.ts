import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { createGqlConfig } from './gql/gql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GqlResponseInterceptor } from './gql/gql.response.interceptor';
import { GraphQLExceptionsFilter } from './filters/exception.filter';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/product.entity';
import { OrderModule } from './modules/order/order.module';
import { Order } from './modules/order/order.entity';
import { Cart } from './modules/cart/cart.entity';
import { CartModule } from './modules/cart/cart.module';
import { CartItem } from './modules/cart-item/cart-item.entity';
import { CartItemModule } from './modules/cart-item/cart-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => createGqlConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [User, Product, Order, Cart, CartItem],
        synchronize: true,
      }),
    }),
    UserModule,
    ProductModule,
    OrderModule,
    CartModule,
    CartItemModule,
  ],
  providers: [
    AppResolver,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GqlResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionsFilter,
    },
  ],
})
export class AppModule {}
