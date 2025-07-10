import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user/user.entity';
import { CartItem } from '../cart-item/cart-item.entity';

@Entity()
@ObjectType()
export class Cart {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;

  @OneToMany(() => CartItem, (item) => item.cart)
  @Field(() => [CartItem], { nullable: true })
  items?: CartItem[];
}
