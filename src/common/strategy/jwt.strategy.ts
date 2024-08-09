// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { promises } from 'dns';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface Payload{
    id:number,
    role:string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-default-secret',
        });
    }

    async validate(payload: Payload):Promise<Payload> {
        return { id: payload.id, role: payload.role }; // Ensure role is included in the payload
    }
}
