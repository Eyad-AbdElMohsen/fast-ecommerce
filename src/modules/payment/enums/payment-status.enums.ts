import { registerEnumType } from '@nestjs/graphql';

export enum PaymentStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
registerEnumType(PaymentStatusEnum, {
  name: 'PaymentStatus',
});
