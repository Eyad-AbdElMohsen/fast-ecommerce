import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ValidPermissions } from 'src/validators/permissions.validator';

@InputType()
export class CreateSecurityInput {
  @Field()
  @IsNotEmpty()
  groupName: string;

  @Field({ nullable: true })
  description?: string;

  @ValidPermissions()
  @Field(() => [String])
  @IsString({ each: true })
  permissions: string[];

  @Field({ defaultValue: true })
  @IsBoolean()
  isActive: boolean;
}

@InputType()
export class FindOrCreateSecurityInput extends CreateSecurityInput {}

