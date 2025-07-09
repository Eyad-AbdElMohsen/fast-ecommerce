import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';
import { PaymentStatusEnum } from './enums/payment-status.enums';
import { PaymentMethodEnum } from './enums/payment-method.enum';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'SET NULL' })
  @JoinColumn()
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'SET NULL' })
  @Field(() => User, { nullable: true })
  user?: User;

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

  @Column('decimal')
  @Field()
  amount: number;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  paidAt?: Date;
}
