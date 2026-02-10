import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (
          req: Request & { cookies?: { accessToken?: string } },
        ): string | null => req.cookies?.accessToken ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    };

    super(options);
  }

  validate(payload: JwtPayload): JwtPayload {
    // req.user me ab typed payload milega
    return payload;
  }
}
