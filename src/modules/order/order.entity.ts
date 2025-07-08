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

  @Field()
  @Column({ default: 'pending' })
  status: string;
}
