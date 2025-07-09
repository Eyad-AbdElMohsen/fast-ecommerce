import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethodEnum {
  CARD = 'card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CASH_ON_DELIVERY = 'cash_on_delivery',
}
registerEnumType(PaymentMethodEnum, {
  name: 'PaymentMethod',
});
