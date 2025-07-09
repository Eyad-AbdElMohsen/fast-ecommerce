import { registerEnumType } from '@nestjs/graphql';

export enum ShipmentCarrierEnum {
  Bosta = 'Bosta',
  YallaGo = 'YallaGo',
  Talabat = 'Talabat',
  Otlob = 'Otlob',
  Other = 'Other',
}
registerEnumType(ShipmentCarrierEnum, {
  name: 'ShipmentCarrierEnum',
});
