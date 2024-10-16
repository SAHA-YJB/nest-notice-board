// 커스텀 데코레이터 생성
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ip = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip;
  },
);
