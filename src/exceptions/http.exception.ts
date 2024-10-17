// NestJS에서 예외 필터를 생성하기 위한 데코레이터와 인터페이스를 임포트
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// Express의 Request와 Response 객체를 임포트
import { Request, Response } from 'express';

// @Catch 데코레이터는 이 필터가 HttpException을 처리하도록 지정
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // catch 메서드는 예외가 발생했을 때 실행
  // exception은 발생한 예외 객체이며, host는 현재 요청의 실행 컨텍스트
  catch(exception: HttpException, host: ArgumentsHost) {
    // HTTP 요청 및 응답 객체를 가져옴
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 예외의 상태 코드를 가져옴
    const status = exception.getStatus();

    // 응답 객체를 사용하여 클라이언트에게 JSON 형식의 에러 응답을 보냄
    response.status(status).json({
      statusCode: status, // 상태 코드
      timestamp: new Date().toISOString(), // 에러 발생 시간
      path: request.url, // 요청 경로
    });
  }
}
