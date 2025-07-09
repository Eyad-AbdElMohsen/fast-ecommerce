import { registerEnumType } from '@nestjs/graphql';

export enum ShipmentStatusEnum {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
registerEnumType(ShipmentStatusEnum, {
  name: 'ShipmentStatus',
});
