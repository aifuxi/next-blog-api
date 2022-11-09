import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
