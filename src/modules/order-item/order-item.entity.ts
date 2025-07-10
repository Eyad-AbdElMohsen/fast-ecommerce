import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';

@Entity()
@ObjectType()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => Int)
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  @Field(() => Order)
  order: Order;

  @Column()
  @Field(() => Int)
  orderId: number;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'SET NULL',
  })
  @Field(() => Product, { nullable: true })
  product: Product;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  productId?: number;
}
