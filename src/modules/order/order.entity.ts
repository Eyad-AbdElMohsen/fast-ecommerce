import { Field, Float, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user/user.entity';
import { OrderStatusEnum } from './enum/order-status.enum';
import { Payment } from '../payment/payment.entity';
import { Shipment } from '../shipment/shipment.entity';
import { OrderItem } from '../order-item/order-item.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @Column()
  total_amount: number;

  @Field(() => OrderStatusEnum)
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Field(() => User)
  user: User;

  @OneToOne(() => Payment, (payment) => payment.order, { nullable: true })
  @Field(() => Payment, { nullable: true })
  payment?: Payment;

  @OneToOne(() => Shipment, (shipment) => shipment.order, { nullable: true })
  @Field(() => Shipment, { nullable: true })
  shipment?: Shipment;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Field(() => OrderItem, { nullable: true })
  orderItems?: OrderItem[];
}
