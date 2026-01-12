import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/user.entity';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): User | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;

    return user;
  },
);
