import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../auth/user/user.entity';
import { Product } from '../product/product.entity';
import { ReviewRatingEnum } from './enums/review-rating.enum';

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'enum',
    enum: ReviewRatingEnum,
    nullable: false,
  })
  @Field(() => ReviewRatingEnum, { nullable: true })
  rating?: ReviewRatingEnum;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  comment?: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  @Field(() => Product)
  product: Product;
}
