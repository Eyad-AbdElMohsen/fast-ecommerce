import { Field, Float, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Cart } from '../cart/cart.entity';
import { OrderStatusEnum } from './enum/order-status.enum';
import { Payment } from '../payment/payment.entity';
import { Shipment } from '../shipment/shipment.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @Field(() => User)
  user: User;

  @OneToOne(() => Cart, { nullable: true })
  @JoinColumn()
  @Field(() => Cart)
  cart: Cart;

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

  @OneToOne(() => Payment, (payment) => payment.order, { nullable: true })
  @Field(() => Payment, { nullable: true })
  payment?: Payment;

  @OneToOne(() => Shipment, (shipment) => shipment.order, { nullable: true })
  @Field(() => Shipment, { nullable: true })
  shipment?: Shipment;
}
