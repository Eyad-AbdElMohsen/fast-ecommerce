import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Product } from '../product/product.entity';

@Entity()
@ObjectType()
@Unique(['cart', 'product'])
export class CartItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @Field(() => Cart)
  cart: Cart;
  
  @ManyToOne(() => Product, (product) => product.items, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field(() => Product, { nullable: true })
  product: Product;

  @Column()
  @Field(() => Int)
  quantity: number;
}
