import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import ConfigModule from './config/index';

@Module({
  // imports 배열은 이 모듈에서 사용할 다른 모듈을 지정
  imports: [ConfigModule(), BoardModule],
  // controllers 배열은 이 모듈에서 사용할 컨트롤러를 지정
  controllers: [AppController],
  // providers 배열은 이 모듈에서 사용할 서비스(프로바이더)를 지정
  providers: [AppService],
})
// AppModule 클래스는 애플리케이션의 루트 모듈
// NestModule 인터페이스를 구현하여 미들웨어를 설정할 수 있음
export class AppModule implements NestModule {
  // configure 메서드는 미들웨어를 설정하는 데 사용
  configure(consumer: MiddlewareConsumer) {
    // LoggingMiddleware를 모든 경로에 적용
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
