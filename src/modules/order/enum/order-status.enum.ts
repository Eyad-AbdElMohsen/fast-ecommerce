import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}
registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });
