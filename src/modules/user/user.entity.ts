import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';
import { Cart } from '../cart/cart.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  access_token?: string;

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order], { nullable: true })
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  @Field(() => [Cart], { nullable: true })
  carts: Cart[];
}
