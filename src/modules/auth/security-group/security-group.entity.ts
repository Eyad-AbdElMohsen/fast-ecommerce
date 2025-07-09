import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class SecurityGroup {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field()
  groupName: string;

  @Column('simple-array') 
  @Field(() => [String])
  permissions: string[];

  @Column({ default: true })
  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.securityGroup)
  @Field(() => [User], { nullable: true })
  users?: User[];
}
