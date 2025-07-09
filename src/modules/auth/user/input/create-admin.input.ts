import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class CreateAdminInput extends CreateUserInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  securityGroupId: number;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;
}
