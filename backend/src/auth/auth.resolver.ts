import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from 'src/models/user.model'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/createUser.dto'
import { SignInDto } from './dto/signIn.dto'
import { Request } from 'express'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@/guards/auth.guard'

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [User])
  allUsers(): Promise<User[]> {
    return this.authService.getAllUsers()
  }

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserDto): Promise<User> {
    return this.authService.createUser(data)
  }

  @Mutation(() => User)
  async signIn(@Args('data') data: SignInDto, @Context('req') req: Request): Promise<User> {
    const { user, token } = await this.authService.signIn(data)
    req.res?.cookie('jwt', token, { httpOnly: true })
    return user
  }

  @Mutation(() => User)
  async signOut(@Context('req') req: Request, @Context('user') user: User): Promise<User> {
    req.res?.clearCookie('jwt', { httpOnly: true })
    return user
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async me(@Context('user') user: User): Promise<User> {
    return user
  }
}
