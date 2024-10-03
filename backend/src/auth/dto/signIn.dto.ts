import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

@InputType()
export class SignInDto {
  @Field()
  @MaxLength(30)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Field()
  @MaxLength(30)
  @IsNotEmpty()
  password: string
}
