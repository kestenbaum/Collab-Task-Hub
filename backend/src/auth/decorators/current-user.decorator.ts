import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/user.entity';

export const CurrentUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ): User | string | Date | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;

    if (!user) {
      return undefined;
    }

    // If data is provided, return that property from the user object
    if (data) {
      return user[data as keyof User];
    }

    return user;
  },
);
