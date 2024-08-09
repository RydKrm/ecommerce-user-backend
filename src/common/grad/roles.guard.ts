// src/auth/roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '../enum/role.enum';
import { Observable } from 'rxjs';

interface Payload{
    id:number,
    role:string
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    // canActivate(context: ExecutionContext): boolean {
    //     const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    //     // If no roles are specified, allow access
    //     if (!requiredRoles) {
    //         return true;
    //     }

    //     // Assume user is attached to the request by the JWT strategy
    //     const request: Request = context.switchToHttp().getRequest();
    //     const user:Payload = request.user;

    //     if (!user || !requiredRoles.some(role => role === user.role)) {
    //         throw new ForbiddenException('You do not have permission to access this resource');
    //     }

    //     return true;
    // }
    
    // * Every guard must have a canActive() function 
    canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return request;
      }


}
