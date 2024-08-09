import { SetMetadata, CustomDecorator, ExecutionContext, Injectable, CanActivate, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import * as jwt  from 'jsonwebtoken';

// Define the roles metadata
export const ROLES_KEY = 'roles';
export const Auth = (roles: string[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({ status: false, message: "User not authorized, Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException({ status: false, message: "JWT token is missing" });
    }

    try {
      // const user = this.jwtService.verify(token);
      const secrate = process.env.JWT_TOKEN || "default-token-checker";
      const user : any = jwt.verify(token, secrate );
      request.user = user;

      if (!roles.includes(user.role)) {
        throw new ForbiddenException({ status: false, message: "User not authorized for this route" });
      }
      return true;

    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException({ status: false, message: "Invalid or expired JWT token" });
    }
  }
}
