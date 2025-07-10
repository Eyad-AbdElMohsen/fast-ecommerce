import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CartItem } from '../cart-item/cart-item.entity';
import { Review } from '../review/review.entity';
import { Category } from '../category/category.entity';
import { OrderItem } from '../order-item/order-item.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Int)
  @Column()
  stock_quantity: number;

  @OneToMany(() => Review, (review) => review.product)
  @Field(() => [Review], { nullable: true })
  reviews?: Review[];

  @ManyToOne(() => Category, (category) => category.products)
  @Field(() => Category)
  category: Category;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryId?: number;

  @OneToMany(() => CartItem, (item) => item.product, { nullable: true })
  @Field(() => [CartItem], { nullable: true })
  cartItems?: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product, {
    nullable: true,
  })
  @Field(() => OrderItem, { nullable: true })
  orderItems?: OrderItem[];
}
