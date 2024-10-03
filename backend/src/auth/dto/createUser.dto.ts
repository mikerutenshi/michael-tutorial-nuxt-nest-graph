import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsEnum, MaxLength } from 'class-validator'
import { UserStatus } from '@prisma/client'

@InputType()
export class CreateUserDto {
  @Field()
  @MaxLength(255)
  @IsEmail()
  email: string

  @Field()
  @MaxLength(255)
  password: string

  @Field(() => UserStatus)
  @IsEnum(UserStatus)
  status: UserStatus
}
