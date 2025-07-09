import { Resolver } from '@nestjs/graphql';
import { ShipmentService } from './shipment.service';

@Resolver()
export class ShipmentResolver {
  constructor(private readonly shipmentService: ShipmentService) {}

  //** --------------------- QUERIES --------------------- */

  //** --------------------- MUTATIONS --------------------- */

  //** ------------------ RESOLVE FIELDS & DataLoaders ------------------ */
}
