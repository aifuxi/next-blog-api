import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PayloadDto } from '../dto/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log(process.env.JWT_SECRET, 'process.env.JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadDto): Promise<PayloadDto> {
    return payload;
  }
}
