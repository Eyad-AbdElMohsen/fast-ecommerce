import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipment.entity';
import { ShipmentResolver } from './shipment.resolver';
import { ShipmentService } from './shipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentService, ShipmentResolver],
})
export class ShipmentModule {}
