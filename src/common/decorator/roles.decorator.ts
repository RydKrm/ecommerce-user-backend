import { createParamDecorator, ExecutionContext } from "@nestjs/common";


// export const Roles = (...roles:Role[]) => SetMetadata('roles', roles);

// Create a role decorator
// export const Roles = Reflector.createDecorator<Role[]>();

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );
