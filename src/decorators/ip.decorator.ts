// NestJS에서 커스텀 데코레이터를 생성하기 위한 함수와 실행 컨텍스트를 임포트
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 'Ip'라는 이름의 커스텀 데코레이터를 생성
// 이 데코레이터는 요청 객체에서 클라이언트의 IP 주소를 추출하는 데 사용
export const Ip = createParamDecorator(
  // 데코레이터의 콜백 함수
  // data는 데코레이터에 전달된 데이터이며, 여기서는 사용되지 않음
  // ctx는 현재 요청의 실행 컨텍스트
  (data: unknown, ctx: ExecutionContext): string => {
    // HTTP 요청 객체를 가져옴
    const request = ctx.switchToHttp().getRequest();
    // 요청 객체에서 클라이언트의 IP 주소를 반환
    return request.ip;
  },
);
