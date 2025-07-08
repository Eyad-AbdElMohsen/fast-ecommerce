import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';
import { CartItem } from '../cart-item/cart-item.entity';

@Entity()
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  @Field(() => User)
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;

  @OneToOne(() => Order, { nullable: true })
  @JoinColumn()
  @Field(() => Order, { nullable: true })
  order?: Order;

  @OneToMany(() => CartItem, (item) => item.cart)
  @Field(() => [CartItem], { nullable: true })
  items: CartItem[];
}
