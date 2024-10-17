// NestJS의 Logger와 NestMiddleware 인터페이스를 임포트
import { Logger, NestMiddleware } from '@nestjs/common';

// Express의 Request, Response, NextFunction 타입을 임포트
import { NextFunction, Request, Response } from 'express';

// LoggingMiddleware 클래스는 요청과 응답을 로깅하는 미들웨어
export class LoggingMiddleware implements NestMiddleware {
  // Logger 인스턴스를 생성
  private readonly logger = new Logger('LoggingMiddleware');

  // use 메서드는 미들웨어의 핵심 로직을 정의
  // req는 요청 객체, res는 응답 객체, next는 다음 미들웨어로 제어를 전달하는 함수
  use(req: Request, res: Response, next: NextFunction) {
    // 요청의 HTTP 메서드와 원래 URL을 가져옴
    const { method, originalUrl } = req;
    // 요청 시작 시간을 기록
    const startTime = Date.now();

    // 응답이 완료되면 실행되는 이벤트 리스너 설정
    res.on('finish', () => {
      // 응답의 상태 코드를 가져옴
      const { statusCode } = res;
      // 응답 시간을 계산
      const responseTime = Date.now() - startTime;
      // 로그 메시지를 기록
      this.logger.log(
        `[${method}] [${originalUrl}] [${statusCode}] [${responseTime}ms]`,
      );
    });

    // 다음 미들웨어로 제어를 전달
    next();
  }
}
