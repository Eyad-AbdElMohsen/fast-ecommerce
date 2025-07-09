import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Order } from '../../order/order.entity';
import { Cart } from '../../cart/cart.entity';
import { SecurityGroup } from '../security-group/security-group.entity';
import { Review } from '../../review/review.entity';
import { Payment } from '../../payment/payment.entity';
import { UserRoleEnum } from './enums/user-role.enum';

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

  @Field(() => UserRoleEnum)
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order], { nullable: true })
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  @Field(() => [Cart], { nullable: true })
  carts?: Cart[];

  @OneToMany(() => Review, (review) => review.user)
  @Field(() => [Review], { nullable: true })
  reviews?: Review[];

  @ManyToOne(() => SecurityGroup, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @Field(() => SecurityGroup, { nullable: true })
  securityGroup?: SecurityGroup;

  @Column({ nullable: true })
  securityGroupId?: number;

  @OneToMany(() => Payment, (payment) => payment.user)
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[];
}
