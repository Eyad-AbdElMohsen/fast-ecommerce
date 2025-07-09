import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { ShipmentStatusEnum } from './enums/shipment-status';
import { ShipmentCarrierEnum } from './enums/shipment-carrier';

@Entity()
@ObjectType()
export class Shipment {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @OneToOne(() => Order, (order) => order.shipment, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  @Field(() => Order, { nullable: true })
  order: Order;

  @Column({ nullable: true })
  @Field({ nullable: true })
  orderId: number;

  @Column({
    type: 'enum',
    enum: ShipmentCarrierEnum,
    default: ShipmentCarrierEnum.Other,
  })
  @Field(() => ShipmentCarrierEnum)
  carrier: ShipmentCarrierEnum;

  @Column({
    type: 'enum',
    enum: ShipmentStatusEnum,
    default: ShipmentStatusEnum.PENDING,
  })
  @Field(() => ShipmentStatusEnum)
  status: ShipmentStatusEnum;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  shippedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  deliveredAt?: Date;
}
