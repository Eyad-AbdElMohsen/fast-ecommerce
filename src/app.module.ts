import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql/gql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GqlResponseInterceptor } from './gql/gql.response.interceptor';
import { GraphQLExceptionsFilter } from './filters/exception.filter';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/product.entity';
import { OrderModule } from './modules/order/order.module';
import { Order } from './modules/order/order.entity';
import { Cart } from './modules/cart/cart.entity';
import { CartModule } from './modules/cart/cart.module';
import { CartItem } from './modules/cart-item/cart-item.entity';
import { CartItemModule } from './modules/cart-item/cart-item.module';
import { SecurityGroupModule } from './modules/auth/security-group/security-group.module';
import { SecurityGroup } from './modules/auth/security-group/security-group.entity';
import { Review } from './modules/review/review.entity';
import { ReviewModule } from './modules/review/review.module';
import { Category } from './modules/category/category.entity';
import { CategoryModule } from './modules/category/category.module';
import { PaymentModule } from './modules/payment/payment.module';
import { Payment } from './modules/payment/payment.entity';
import { Shipment } from './modules/shipment/shipment.entity';
import { ShipmentModule } from './modules/shipment/shipment.module';
import { User } from './modules/auth/user/user.entity';
import { UserModule } from './modules/auth/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { DataLoaderInterceptor } from './interceptors/dataloader.interceptor';
import { DataLoaderModule } from './dataloader/dataloader.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    DataLoaderModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule, DataLoaderModule],
      inject: [ConfigService],
      useClass: GqlConfigService,
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
        entities: [
          User,
          Product,
          Order,
          Cart,
          CartItem,
          SecurityGroup,
          Review,
          Category,
          Payment,
          Shipment,
        ],
        synchronize: true,
      }),
    }),
    UserModule,
    ProductModule,
    OrderModule,
    CartModule,
    CartItemModule,
    SecurityGroupModule,
    ReviewModule,
    CategoryModule,
    PaymentModule,
    ShipmentModule,
  ],
  providers: [
    AppResolver,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GqlResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionsFilter,
    },
  ],
})
export class AppModule {}