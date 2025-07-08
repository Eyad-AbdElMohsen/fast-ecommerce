import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from '../cart-item/cart-item.entity';

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

  @OneToMany(() => CartItem, (item) => item.product)
  @Field(() => [CartItem], { nullable: true })
  items: CartItem[];
}
