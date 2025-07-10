import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from '../auth/user/user.entity';
import { PaymentStatusEnum } from './enums/payment-status.enums';
import { PaymentMethodEnum } from './enums/payment-method.enum';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'enum',
    enum: PaymentMethodEnum,
    default: PaymentMethodEnum.CARD,
  })
  @Field(() => PaymentMethodEnum)
  paymentMethod: PaymentMethodEnum;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  @Field(() => PaymentStatusEnum)
  status: PaymentStatusEnum;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  paidAt?: Date;

  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'SET NULL' })
  @JoinColumn()
  @Field(() => Order)
  order: Order;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  orderId?: number;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'SET NULL' })
  @Field(() => User, { nullable: true })
  user?: User;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  userId?: number;
}
