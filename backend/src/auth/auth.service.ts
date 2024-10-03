import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { User } from 'src/models/user.model'
import { CreateUserDto } from './dto/createUser.dto'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/signIn.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 10)
    return this.prisma.user.create({
      data: {
        email: data.email,
        password,
        status: data.status
      }
    })
  }

  async signIn(data: SignInDto): Promise<{ user: User; token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } })

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(data.password, user.password)

      if (isPasswordCorrect) {
        const token = this.jwtService.sign({ sub: user.id }, { expiresIn: '30 days' })
        return { user, token }
      }
    }
    throw new Error('Email or password is incorrect')
  }

  async me(token: string): Promise<User | null> {
    if (token) {
      const data = this.jwtService.decode(token, { json: true }) as { sub: unknown }
      if (data?.sub && !isNaN(Number(data.sub))) {
        const user = await this.prisma.user.findUnique({ where: { id: Number(data.sub) } })
        return user || null
      }
    }
    return null
  }
}
