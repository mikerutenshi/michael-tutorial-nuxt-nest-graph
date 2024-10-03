import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
  imports: [JwtModule.register({ secret: process.env.JWT })]
})
export class AuthModule {}
